const GITHUB_API_BASE_URL = 'https://api.github.com';
const owner = 'hydralauncher';
const repo = 'hydra';

async function fetchLatest() {
    try {
        const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/releases/latest`);
        const latestRelease = await response.json()

        const version = latestRelease.tag_name;
        const releaseNotes = latestRelease.html_url;
        const downloads = latestRelease.assets;

        addReleaseInfo(version, releaseNotes, downloads);
    } catch (error) {
        console.error('error fetching latest release:', error.message);
    }
}

function addReleaseInfo(version, releaseNotes, downloads) {
    const releaseExeLink = document.getElementById('release-exe');
    const releaseDebLink = document.getElementById('release-deb');
    const releaseRpmLink = document.getElementById('release-rpm');
    const releaseNotesLink = document.getElementById('release-notes');
    const downloadButton = document.getElementById('download');

    releaseNotesLink.setAttribute('href', releaseNotes);

    let hydraExe;
    let hydraDeb;
    let hydraRpm;

    downloads.forEach(download => {
        const { name, browser_download_url } = download;
        if (name.endsWith('.exe')) {
            hydraExe = browser_download_url;
        } else if (name.endsWith('.deb')) {
            hydraDeb = browser_download_url;
        } else if (name.endsWith('.rpm')) {
            hydraRpm = browser_download_url;
        }
    });

    Promise.all([fetchDebianVersion(), fetchRedHatRelease()])
        .then(([isDebian, isRedHat]) => {
            if (isDebian) {
                downloadButton.innerText = 'Download for Debian'
                downloadButton.setAttribute('href', hydraDeb)
            } else if (isRedHat) {
                downloadButton.setAttribute('href', hydraRpm)
                downloadButton.innerText = 'Download for Red Hat'
            } else {
                downloadButton.setAttribute('href', hydraExe);
            }
        });

    function fetchDebianVersion() {
        return fetch('/etc/debian_version')
            .then(response => response.ok)
            .catch(() => false);
    }

    function fetchRedHatRelease() {
        return fetch('/etc/redhat-release')
            .then(response => response.ok)
            .catch(() => false);
    }

    releaseExeLink.setAttribute('href', hydraExe);
    releaseDebLink.setAttribute('href', hydraDeb);
    releaseRpmLink.setAttribute('href', hydraRpm);
}

function xyReleasesButton() {
    const releasesButton = document.getElementById('download-2');
    const releasesBox = document.getElementById('release-box');
    let buttonX = releasesButton.offsetLeft;
    let buttonY = releasesButton.offsetTop;
    let buttonW = releasesButton.offsetWidth;
    let buttonH = releasesButton.offsetHeight;

    releasesBox.style.top = `${buttonY}px`
    releasesBox.style.left = `${buttonX}px`
    releasesBox.style.transform = `translate( -${buttonW}px, ${buttonH - 14}px)`
}

const Menu = (function() {
    const menu = document.querySelector('.release-box');

    return {
        show: function() {
            menu.classList.add('show');
        },
        hide: function() {
            menu.classList.remove('show');
        }
    };
})();

fetchLatest(); xyReleasesButton()