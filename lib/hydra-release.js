const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_REPO_OWNER = 'hydralauncher';
const GITHUB_REPO = 'hydra';

const fetchLatestRelease = async (ghAPI, ghOwner, ghRepo) => {
    try {
        const response = await fetch(`${ghAPI}/repos/${ghOwner}/${ghRepo}/releases/latest`);

        return await response.json()
    } catch (error) {
        console.error('error fetching latest release:', error.message);
    }
}

const supportedSystems = (system) => {
    const systemProps = {
        windows: {
            os: 'Windows',
            extension: '.exe',
            htmlClass: 'release-exe',
        },
        debian: {
            os: 'Debian',
            extension: '.deb',
            htmlClass: 'release-deb',
        },
        redhat: {
            os: 'Redhat',
            extension: '.rpm',
            htmlClass: 'release-rpm',
        },
    }

    return systemProps[system] || systemProps
}

const userSystem = /Linux/.test(navigator.userAgent) ? 'debian' : 'windows';

fetchLatestRelease(GITHUB_API_BASE_URL, GITHUB_REPO_OWNER, GITHUB_REPO)
    .then(latest => {
        const getExecutableLink = (osExtension) => {
            return latest.assets
                .find(assets => assets.name.endsWith(osExtension)).browser_download_url;
        }

        // add download button href
        const downloadButton = document.getElementById('download')
        downloadButton
            .setAttribute('href', getExecutableLink(supportedSystems(userSystem).extension))

        // add release items href
        for(const item in supportedSystems()) {
            document.getElementById(supportedSystems(item).htmlClass)
                .setAttribute('href', getExecutableLink(supportedSystems(item).extension))
        }

        // add changelog href
        document.getElementById('release-notes')
            .setAttribute('href', latest.html_url)
    })

// place releases box under releases button
const releasesButton = document.getElementById('download-2');
const releasesBox = document.getElementById('release-box');

const spawnReleaseBox = () => {
    const buttonX = releasesButton.offsetLeft;
    const buttonY = releasesButton.offsetTop;
    const buttonW = releasesButton.offsetWidth;
    const buttonH = releasesButton.offsetHeight;
    const boxToButtonGap = 10

    releasesBox.style.top = `${buttonY}px`
    releasesBox.style.left = `${buttonX}px`
    releasesBox.style.transform = `translate( -${buttonW}px, ${buttonH - boxToButtonGap}px)`
}

// Dropdown handler
const Menu = {
    menu: document.querySelector('.release-box'),
    show: function() {
        this.menu.classList.add('show');
    },
    hide: function() {
        this.menu.classList.remove('show');
    }
};
