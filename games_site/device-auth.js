const masterKey = "SafePassword!";
let approved = localStorage.getItem("approvedDevice");

if (approved === "true") {
    unlock();
} else {
    const input = prompt("Enter access key:");
    if (input === masterKey) {
        localStorage.setItem("approvedDevice", "true");
        unlock();
    } else {
        // Replace page content immediately
        document.body.innerHTML =
            "<h1 style='color:red;text-align:center;margin-top:20%'>Access Denied</h1>";
    }
}

function unlock() {
    document.getElementById("siteContent").style.display = "block";
}