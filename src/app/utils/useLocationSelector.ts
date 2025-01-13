import REGION from "../../assets/json/ph/region.json";
import PROVINCE from "../../assets/json/ph/province.json";
import CITY from "../../assets/json/ph/city.json";
import BARANGAY from "../../assets/json/ph/barangay.json";

interface Region {
  region_code: string;
  region_name: string;
}

interface Province {
  province_code: string;
  province_name: string;
  region_code: string;
}

interface City {
  city_code: string;
  city_name: string;
  province_code: string;
}

interface Barangay {
  brgy_code: string;
  brgy_name: string;
  city_code: string;
}

// Type cast the JSON data
const regionData: Region[] = REGION as Region[];
const provinceData: Province[] = PROVINCE as Province[];
const cityData: City[] = CITY as City[];
const barangayData: Barangay[] = BARANGAY as Barangay[];

const myHandlers = {
  // Fill provinces based on selected region
  fillProvinces: function (event: Event) {
    const regionCode = (event.target as HTMLSelectElement).value;

    // Set selected region text to input
    const regionText = (event.target as HTMLSelectElement).selectedOptions[0]
      .text;
    (document.getElementById("region-text") as HTMLInputElement).value =
      regionText;

    // Clear inputs
    (document.getElementById("province-text") as HTMLInputElement).value = "";
    (document.getElementById("city-text") as HTMLInputElement).value = "";
    (document.getElementById("barangay-text") as HTMLInputElement).value = "";

    // Empty dropdowns
    const provinceDropdown = document.getElementById(
      "province"
    ) as HTMLSelectElement;
    provinceDropdown.innerHTML =
      "<option selected disabled>Choose State/Province</option>";

    const cityDropdown = document.getElementById("city") as HTMLSelectElement;
    cityDropdown.innerHTML = "<option selected disabled></option>";

    const barangayDropdown = document.getElementById(
      "barangay"
    ) as HTMLSelectElement;
    barangayDropdown.innerHTML = "<option selected disabled></option>";

    // Filter and populate provinces
    const result = provinceData.filter(
      (province) => province.region_code === regionCode
    );
    result.sort((a, b) => a.province_name.localeCompare(b.province_name));

    result.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.province_code;
      option.textContent = entry.province_name;
      provinceDropdown.appendChild(option);
    });
  },

  // Fill cities based on selected province
  fillCities: function (event: Event) {
    const provinceCode = (event.target as HTMLSelectElement).value;

    // Set selected province text to input
    const provinceText = (event.target as HTMLSelectElement).selectedOptions[0]
      .text;
    (document.getElementById("province-text") as HTMLInputElement).value =
      provinceText;

    // Clear inputs
    (document.getElementById("city-text") as HTMLInputElement).value = "";
    (document.getElementById("barangay-text") as HTMLInputElement).value = "";

    // Empty city and barangay dropdowns
    const cityDropdown = document.getElementById("city") as HTMLSelectElement;
    cityDropdown.innerHTML =
      "<option selected disabled>Choose city/municipality</option>";

    const barangayDropdown = document.getElementById(
      "barangay"
    ) as HTMLSelectElement;
    barangayDropdown.innerHTML = "<option selected disabled></option>";

    // Filter and populate cities
    const result = cityData.filter(
      (city) => city.province_code === provinceCode
    );
    result.sort((a, b) => a.city_name.localeCompare(b.city_name));

    result.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.city_code;
      option.textContent = entry.city_name;
      cityDropdown.appendChild(option);
    });
  },

  // Fill barangays based on selected city
  fillBarangays: function (event: Event) {
    const cityCode = (event.target as HTMLSelectElement).value;

    // Set selected city text to input
    const cityText = (event.target as HTMLSelectElement).selectedOptions[0]
      .text;
    (document.getElementById("city-text") as HTMLInputElement).value = cityText;

    // Clear barangay input
    (document.getElementById("barangay-text") as HTMLInputElement).value = "";

    // Empty barangay dropdown
    const barangayDropdown = document.getElementById(
      "barangay"
    ) as HTMLSelectElement;
    barangayDropdown.innerHTML =
      "<option selected disabled>Choose barangay</option>";

    // Filter and populate barangays
    const result = barangayData.filter(
      (barangay) => barangay.city_code === cityCode
    );
    result.sort((a, b) => a.brgy_name.localeCompare(b.brgy_name));

    result.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.brgy_code;
      option.textContent = entry.brgy_name;
      barangayDropdown.appendChild(option);
    });
  },

  // Update barangay input when a barangay is selected
  onchangeBarangay: function (event: Event) {
    const barangayText = (event.target as HTMLSelectElement).selectedOptions[0]
      .text;
    (document.getElementById("barangay-text") as HTMLInputElement).value =
      barangayText;
  },
};

// Event listeners for change events
window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("region")
    ?.addEventListener("change", myHandlers.fillProvinces);
  document
    .getElementById("province")
    ?.addEventListener("change", myHandlers.fillCities);
  document
    .getElementById("city")
    ?.addEventListener("change", myHandlers.fillBarangays);
  document
    .getElementById("barangay")
    ?.addEventListener("change", myHandlers.onchangeBarangay);

  // Load regions dropdown
  const regionDropdown = document.getElementById("region") as HTMLSelectElement;
  regionDropdown.innerHTML = "<option selected disabled>Choose Region</option>";

  regionData.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.region_code;
    option.textContent = entry.region_name;
    regionDropdown.appendChild(option);
  });
});
