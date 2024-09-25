// Define Cv values for different valve sizes
const CvValues = {
    2: 47,
    3: 150,
    4: 400,
    5: 600,
    6: 800,
    8: 1390,
    10: 3150,
    12: 4000,
    14: 5300,
    16: 8200,
    18: 10452,
    20: 14251,
    24: 26511,
    26: 30000,
    28: 33600,
    30: 39000,
    32: 47250,
    34: 50000,
    36: 59700,
    38: 69000,
    40: 78500,
    42: 83000,
    44: 128000,
    48: 128000,
    54: 140000,
    56: 150000,
    60: 185000,
    66: 200000,
    72: 215000,
    84: 340000,
    // Add additional valve sizes here
};

function Login() {
    const username = document.getElementById("Username").value;
    localStorage.setItem("Username", username);
    window.location = "mainPage.html";
}

function calculate() {
    const flowrate = parseFloat(document.getElementById("flowrate").value);
    const temperature = parseFloat(document.getElementById("temperature").value);
    const pressure = parseFloat(document.getElementById("pressure").value);
    const density = parseFloat(document.getElementById("density").value);
    const valveSize = parseInt(document.getElementById("valveSize").value, 10);

    // Validate inputs
    if (isNaN(flowrate) || isNaN(temperature) || isNaN(pressure) || isNaN(density) || isNaN(valveSize)) {
        alert("Please enter valid numeric values.");
        return; // Exit the function on invalid input
    }

    // Store values in local storage
    localStorage.setItem("flowrate", flowrate);
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("pressure", pressure);
    localStorage.setItem("density", density);
    localStorage.setItem("valveSize", valveSize);

    // Determine Cv based on valve size
    const Cv = CvValues[valveSize] || 900; // Default value if valveSize is not found

    // Store Cv in local storage and update the label
    localStorage.setItem("Cv", Cv);
    document.getElementById("CvLabel").textContent = "Cv: " + Cv + " gpm";
}

function pressureDrop() {
    const flowrate = parseFloat(document.getElementById("flowrate").value);
    const density = parseFloat(document.getElementById("density").value);
    const valveSize = parseInt(document.getElementById("valveSize").value, 10);

    const SG = density / 1000; // Specific Gravity

    // Determine Cv based on valve size
    const Cv = CvValues[valveSize] || 900;

    // Calculate pressure drop
    const dP = SG * Math.pow(flowrate / (0.865*Cv), 2); // Default value if valveSize is not found

    // Store Cv in local storage and update the label
    document.getElementById("dpLabel").textContent = "dP: " + dP.toFixed(2) + " bar";
}
