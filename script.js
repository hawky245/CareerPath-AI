let userData = {};

function loginUser() {

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    userData.name = name;
    userData.mobile = mobile;
    userData.email = email;

    localStorage.setItem(
        "career_user",
        JSON.stringify(userData)
    );

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("profilePage").classList.remove("hidden");
}

function saveProfile() {

    userData.currentRole =
        document.getElementById("currentRole").value;

    userData.targetRole =
        document.getElementById("targetRole").value;

    userData.experience =
        document.getElementById("experience").value;

    userData.skills = [
        {
            name: document.getElementById("skill1").value,
            level: Number(
                document.getElementById("skillLevel1").value
            )
        },
        {
            name: document.getElementById("skill2").value,
            level: Number(
                document.getElementById("skillLevel2").value
            )
        }
    ];

    localStorage.setItem(
        "career_user",
        JSON.stringify(userData)
    );

    loadDashboard();
}

function loadDashboard() {

    document.getElementById("profilePage")
        .classList.add("hidden");

    document.getElementById("dashboard")
        .classList.remove("hidden");

    document.getElementById("welcomeText").innerHTML =
        `Welcome ${userData.name}`;

    generateMetrics();
    loadSkills();
    loadRoadmap();
    loadRadarChart();
    loadGauge();
}

function generateMetrics() {

    let exp = parseInt(userData.experience || 2);

    let promotion =
        Math.min(95, 50 + exp * 5);

    document.getElementById("promotionMetric")
        .innerHTML = promotion + "%";

    document.getElementById("timelineMetric")
        .innerHTML = Math.max(1, 12 - exp) + " Months";

    document.getElementById("salaryMetric")
        .innerHTML =
        (8 + exp) + "-" + (15 + exp) + " LPA";
}

function loadSkills() {

    document.getElementById("skillGapList")
        .innerHTML = `
        <p><strong>System Design</strong></p>
        <p>Required for senior engineering roles.</p><br>

        <p><strong>Leadership</strong></p>
        <p>Important for promotion and management.</p><br>

        <p><strong>Cloud Computing</strong></p>
        <p>AWS / Azure fundamentals recommended.</p>
    `;
}

function loadRoadmap() {

    document.getElementById("roadmapList")
        .innerHTML = `
        <li>Month 1-2 : Learn System Design</li>
        <li>Month 3-4 : Build Real Projects</li>
        <li>Month 5-6 : Learn Cloud Computing</li>
        <li>Month 7-8 : Improve Leadership Skills</li>
        <li>Month 9-10 : Interview Preparation</li>
        <li>Month 11-12 : Apply for Promotion</li>
    `;
}

function openTab(evt, tabName) {

    let tabs =
        document.getElementsByClassName("tab-content");

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    let btns =
        document.getElementsByClassName("tab-btn");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }

    document.getElementById(tabName)
        .classList.add("active");

    evt.currentTarget.classList.add("active");
}

function sendMessage() {

    let input =
        document.getElementById("chatInput");

    let msg = input.value.trim();

    if (msg === "") return;

    let chatBox =
        document.getElementById("chatBox");

    chatBox.innerHTML +=
        `<p><strong>You:</strong> ${msg}</p>`;

    let reply =
        "Focus on projects, system design, communication skills, and interview preparation.";

    chatBox.innerHTML +=
        `<p><strong>AI:</strong> ${reply}</p>`;

    input.value = "";

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

function loadRadarChart() {

    let skills =
        userData.skills || [];

    let labels =
        skills.map(s => s.name);

    let values =
        skills.map(s => s.level);

    let data = [{
        type: "scatterpolar",
        r: values,
        theta: labels,
        fill: "toself"
    }];

    let layout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 10]
            }
        },
        showlegend: false
    };

    Plotly.newPlot(
        "radarChart",
        data,
        layout
    );
}

function loadGauge() {

    let exp =
        parseInt(userData.experience || 2);

    let score =
        Math.min(95, 50 + exp * 5);

    let data = [{
        type: "indicator",
        mode: "gauge+number",
        value: score,
        title: {
            text: "Promotion Readiness"
        },
        gauge: {
            axis: {
                range: [0, 100]
            }
        }
    }];

    Plotly.newPlot(
        "promotionGauge",
        data
    );
}

function logout() {

    localStorage.removeItem(
        "career_user"
    );

    location.reload();
}

window.onload = function () {

    let saved =
        localStorage.getItem("career_user");

    if (saved) {

        userData =
            JSON.parse(saved);

        loadDashboard();
    }
};
