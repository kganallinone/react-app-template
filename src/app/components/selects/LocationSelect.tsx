import React, { useEffect, useState } from "react";

import REGION from "../../../assets/json/ph/region.json";
import PROVINCE from "../../../assets/json/ph/province.json";
import CITY from "../../../assets/json/ph/city.json";
import BARANGAY from "../../../assets/json/ph/barangay.json";

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

interface LocationData {
  lat: string;
  lng: string;
  address: string;
  details: {
    region: {
      name: string;
      code: string;
    };
    province: {
      name: string;
      code: string;
    };
    city: {
      name: string;
      code: string;
    };
    barangay: {
      name: string;
      code: string;
    };
    street: string;
    house_no: string;
    postal_code: string;
  };
}

// Accepts onChange function and default values as props
interface LocationSelectProps {
  onChange: (locationValue: LocationData) => void;
  onRemove: () => void;
  defaultRegionCode?: string;
  defaultProvinceCode?: string;
  defaultCityCode?: string;
  defaultBarangayCode?: string;
}

const regionData: Region[] = REGION as Region[];
const provinceData: Province[] = PROVINCE as Province[];
const cityData: City[] = CITY as City[];
const barangayData: Barangay[] = BARANGAY as Barangay[];

const LocationSelect = ({
  onChange,
  onRemove,
  defaultRegionCode,
  defaultProvinceCode,
  defaultCityCode,
  defaultBarangayCode,
}: LocationSelectProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>(
    defaultRegionCode || ""
  );
  const [selectedProvince, setSelectedProvince] = useState<string>(
    defaultProvinceCode || ""
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    defaultCityCode || ""
  );
  const [selectedBarangay, setSelectedBarangay] = useState<string>(
    defaultBarangayCode || ""
  );

  const [regionName, setRegionName] = useState<string>("");
  const [provinceName, setProvinceName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [barangayName, setBarangayName] = useState<string>("");

  const [provinceOptions, setProvinceOptions] = useState<Province[]>([]);
  const [cityOptions, setCityOptions] = useState<City[]>([]);
  const [barangayOptions, setBarangayOptions] = useState<Barangay[]>([]);

  useEffect(() => {
    const regionDropdown = document.getElementById(
      "region"
    ) as HTMLSelectElement;
    regionData.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.region_code;
      option.textContent = entry.region_name;
      regionDropdown.appendChild(option);
    });

    // Set default selected values if provided
    if (defaultRegionCode) {
      setSelectedRegion(defaultRegionCode);
      const defaultRegion = regionData.find(
        (region) => region.region_code === defaultRegionCode
      );
      setRegionName(defaultRegion ? defaultRegion.region_name : "");
    }
  }, [defaultRegionCode]);

  useEffect(() => {
    if (selectedRegion) {
      const filteredProvinces = provinceData.filter(
        (province) => province.region_code === selectedRegion
      );
      setProvinceOptions(filteredProvinces);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      const filteredCities = cityData.filter(
        (city) => city.province_code === selectedProvince
      );
      setCityOptions(filteredCities);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      const filteredBarangays = barangayData.filter(
        (barangay) => barangay.city_code === selectedCity
      );
      setBarangayOptions(filteredBarangays);
    }
  }, [selectedCity]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regionCode = event.target.value;
    const selectedRegion = regionData.find(
      (region) => region.region_code === regionCode
    );
    setSelectedRegion(regionCode);
    setRegionName(selectedRegion ? selectedRegion.region_name : "");
    setSelectedProvince("");
    setSelectedCity("");
    setBarangayOptions([]);
    setCityOptions([]);
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceCode = event.target.value;
    const selectedProvince = provinceData.find(
      (province) => province.province_code === provinceCode
    );
    setSelectedProvince(provinceCode);
    setProvinceName(selectedProvince ? selectedProvince.province_name : "");
    setSelectedCity("");
    setBarangayOptions([]);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityCode = event.target.value;
    const selectedCity = cityData.find((city) => city.city_code === cityCode);
    setSelectedCity(cityCode);
    setCityName(selectedCity ? selectedCity.city_name : "");
  };

  const handleBarangayChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const brgyCode = event.target.value;
    const selectedBarangay = barangayData.find(
      (barangay) => barangay.brgy_code === brgyCode
    );
    setSelectedBarangay(brgyCode);
    setBarangayName(selectedBarangay ? selectedBarangay.brgy_name : "");

    const fullAddress = `${regionName}, ${provinceName}, ${cityName}, ${
      selectedBarangay ? selectedBarangay.brgy_name : ""
    }`;

    const newLocationData: LocationData = {
      lat: "",
      lng: "",
      address: fullAddress,
      details: {
        region: {
          name: regionName,
          code: selectedRegion,
        },
        province: {
          name: provinceName,
          code: selectedProvince,
        },
        city: {
          name: cityName,
          code: selectedCity,
        },
        barangay: {
          name: selectedBarangay ? selectedBarangay.brgy_name : "",
          code: selectedBarangay ? selectedBarangay.brgy_code : "",
        },
        street: "",
        house_no: "",
        postal_code: "",
      },
    };

    onChange(newLocationData);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          fullAddress
        )}`
      );
      const results = await response.json();

      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        onChange({
          ...newLocationData,
          lat: lat.toString(),
          lng: lon.toString(),
        });
      } else {
        console.error("Geocoding failed for address:", fullAddress);
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  return (
    <div className="bg-white mb-4">
      <div className="flex justify-between">
        <h2 className="text-xs text-gray-400 px-1">Location (optional)</h2>

        <button
          onClick={() => onRemove && onRemove()}
          className="text-red-500 text-xs px-1 italic"
        >
          Remove
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          id="region"
          value={selectedRegion}
          onChange={handleRegionChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="" disabled>
            Choose Region
          </option>
        </select>

        <select
          id="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          disabled={!selectedRegion}
          className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            !selectedRegion ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="" disabled>
            Choose Province
          </option>
          {provinceOptions.map((province) => (
            <option key={province.province_code} value={province.province_code}>
              {province.province_name}
            </option>
          ))}
        </select>

        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedProvince}
          className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            !selectedProvince ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="" disabled>
            Choose City/Municipality
          </option>
          {cityOptions.map((city) => (
            <option key={city.city_code} value={city.city_code}>
              {city.city_name}
            </option>
          ))}
        </select>

        <select
          id="barangay"
          value={selectedBarangay}
          onChange={handleBarangayChange}
          disabled={!selectedCity}
          className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            !selectedCity ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="" disabled>
            Choose Barangay
          </option>
          {barangayOptions.map((barangay) => (
            <option key={barangay.brgy_code} value={barangay.brgy_code}>
              {barangay.brgy_name}
            </option>
          ))}
        </select>
      </div>
      <p className="hidden text-xs text-gray-400 px-1">{barangayName} </p>
    </div>
  );
};

export default LocationSelect;
