import { createContext, useCallback, useContext, useEffect, useReducer } from "react"
export const BASE_URL = "http://localhost:9000"

const CitiesContext = createContext()


function CitiesProvider({ children }) {




    const initialState = {
        cities: [],
        isLoading: false,
        currCity: {},
        error: ""
    }


    function reducer(state, action) {
        switch (action.type) {
            case "loading":
                return { ...state, isLoading: true }
            case "cities/loaded":
                return { ...state, isLoading: false, cities: action.payload }
            case "city/loaded":
                return { ...state, isLoading: false, currCity: action.payload }

            case "cities/created":
                return { ...state, isLoading: false, cities: [...state.cities, action.payload] }


            case "cities/deleted":
                return {
                    ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)
                }
            case "rejected":
                return { ...state, isLoading: false, error: action.payload }

            default: throw new Error("hamada")

        }

    }

    const [{ cities, isLoading, currCity, error }, dispatch] = useReducer(reducer, initialState)





    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" })
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data })
            } catch {
                dispatch({ type: "rejected", payload: "there is an errrror" })
            }

        }

        fetchCities();

    }, [])



    const fetchCity = useCallback(async (id) => {

        if (Number(id) === currCity.id) return
        dispatch({ type: "loading" })
        try {

            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const cityData = await res.json();
            dispatch({ type: "city/loaded", payload: cityData })

        } catch {
            dispatch({ type: "rejected", payload: "error while fetching current city" })
        }




    }, [currCity.id])
    async function createCity(newCity) {
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "post",
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const cityData = await res.json();
            dispatch({ type: "city/loaded", payload: cityData })
            dispatch({ type: "cities/created", payload: cityData })

        } catch {
            alert("error")
        }
    }


    async function deleteCity(cityId) {
        dispatch({ type: "loading" })
        try {
            await fetch(`${BASE_URL}/cities/${cityId}`, {
                method: "DELETE",
            });

            dispatch({ type: "cities/deleted", payload: cityId })

        } catch {
            dispatch({ type: "rejected", payload: "failed to delete" })

        }
    }


    return (
        <CitiesContext.Provider value={{
            cities,
            currCity,
            fetchCity,
            createCity,
            deleteCity,
            isLoading,
            error,
        }}>
            {children}
        </CitiesContext.Provider>)
}


function useCities() {
    const context = useContext(CitiesContext)
    return context
}




export { useCities, CitiesProvider }