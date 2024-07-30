import { useState, useEffect } from "react";
import { fetchAllCountries } from "../api/apiService";
import { CountriesByRegion, IObject } from "../types";
import MockData from "../MOCK_DATA.json";
interface Country {
  name: string;
  capital: string;
  region: string;
}

const useFetchCountries = () => {
  const [countriesByRegion, setCountriesByRegion] = useState<CountriesByRegion>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data: IObject = await fetchAllCountries();

        if (!data) {
          setCountriesByRegion(MockData);
          setError("Failed to fetch countries, using mock data instead.");
          setLoading(false);
          return;
        }

        const countryArray: Country[] = Object.values(data).map((country: any) => ({
          name: country.name,
          capital: country.capital,
          region: country.region,
        }));

        const filteredCountryArray = countryArray.filter(
          (country) => country.name !== country.capital
        );

        const formattedData: CountriesByRegion = filteredCountryArray.reduce((acc, country) => {
          const { name, capital, region } = country;
          return {
            ...acc,
            [region]: {
              ...acc[region],
              [name]: capital,
            },
          };
        }, {} as CountriesByRegion);

        setCountriesByRegion(formattedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch countries");
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return { countriesByRegion, loading, error };
};

export default useFetchCountries;
