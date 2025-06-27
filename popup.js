// function filter(seconds) {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         const tab = tabs[0];
//         if (!tab || !tab.url || !tab.url.includes("linkedin.com/jobs")) {
//             alert("Please open a LinkedIn Jobs search page.");
//             return;
//         }

//         try {
//             const url = new URL(tab.url);
//             url.searchParams.set("f_TPR", `r${seconds}`);
//             chrome.tabs.update(tab.id, { url: url.toString() });
//         } catch (e) {
//             console.error("Error updating URL:", e);
//             alert("Could not modify the LinkedIn URL.");
//         }
//     });
// }

// // ✅ Add event listeners only after DOM is ready
// document.addEventListener("DOMContentLoaded", () => {
//     const btn30 = document.getElementById("btn-30");
//     const btn60 = document.getElementById("btn-60");
//     const btn1440 = document.getElementById("btn-1440");

//     if (btn30) btn30.addEventListener("click", () => filter(1800));   // 30 mins
//     if (btn60) btn60.addEventListener("click", () => filter(3600));   // 1 hour
//     if (btn1440) btn1440.addEventListener("click", () => filter(86400)); // 24 hours
// });


function filter(seconds) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];
        if (!tab || !tab.url || !tab.url.includes("linkedin.com/jobs")) {
            alert("Please open a LinkedIn Jobs search page.");
            return;
        }

        try {
            const url = new URL(tab.url);
            url.searchParams.set("f_TPR", `r${seconds}`);
            chrome.tabs.update(tab.id, { url: url.toString() });
        } catch (e) {
            console.error("Error updating URL:", e);
            alert("Could not modify the LinkedIn URL.");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = [
        { id: "btn-5", seconds: 300 },
        { id: "btn-15", seconds: 900 },
        { id: "btn-30", seconds: 1800 },
        { id: "btn-60", seconds: 3600 },
        { id: "btn-1440", seconds: 86400 }
    ];

    buttons.forEach(btn => {
        const el = document.getElementById(btn.id);
        if (el) {
            el.addEventListener("click", () => filter(btn.seconds));
        }
    });
});





// function filter(seconds) {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         const tab = tabs[0];
//         if (!tab || !tab.url || !tab.url.includes("linkedin.com/jobs")) {
//             alert("Please open a LinkedIn Jobs search page.");
//             return;
//         }

//         try {
//             const url = new URL(tab.url);
//             url.searchParams.set("f_TPR", `r${seconds}`);

//             // Inject a script into the tab to set window.location.href
//             chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 func: (url) => {
//                     window.location.href = url;
//                 },
//                 args: [url.toString()]
//             });

//         } catch (e) {
//             console.error("Error updating URL:", e);
//             alert("Could not modify the LinkedIn URL.");
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const buttons = [
//         { id: "btn-5", seconds: 300 },
//         { id: "btn-15", seconds: 900 },
//         { id: "btn-30", seconds: 1800 },
//         { id: "btn-60", seconds: 3600 },
//         { id: "btn-1440", seconds: 86400 }
//     ];

//     buttons.forEach(btn => {
//         const el = document.getElementById(btn.id);
//         if (el) {
//             el.addEventListener("click", () => filter(btn.seconds));
//         }
//     });
// });