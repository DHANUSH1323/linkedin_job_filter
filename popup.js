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



//Multiple job platforms support different query parameters for filtering job postings by recency.
// popup.js

function filter(seconds) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];
        if (!tab || !tab.url) {
            alert("No active tab found.");
            return;
        }

        const platform = document.getElementById("platform").value;

        try {
            const url = new URL(tab.url);

            if (platform === "linkedin" && url.href.includes("linkedin.com/jobs")) {
                url.searchParams.set("f_TPR", `r${seconds}`);
                chrome.tabs.update(tab.id, { url: url.toString() });
            } else if (platform === "indeed" && url.href.includes("indeed.com/jobs")) {
                url.searchParams.set("fromage", Math.ceil(seconds / 60));
                chrome.tabs.update(tab.id, { url: url.toString() });
            } else if (platform === "dice" && url.href.includes("dice.com/jobs")) {
                // Dice doesn't support minute granularity, using 'postedDate=1' (last 1 day)
                url.searchParams.set("postedDate", "1");
                chrome.tabs.update(tab.id, { url: url.toString() });
            } else {
                alert("Please open the correct job site for the selected platform.");
            }
        } catch (e) {
            console.error("Error updating URL:", e);
            alert("Could not modify the URL.");
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