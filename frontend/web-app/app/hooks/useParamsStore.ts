import { create } from "zustand"

// Define the structure of the state managed by Zustand
type State = {
    pageNumber: number
    pageSize: number
    pageCount: number
    searchTerm: string
    searchValue: string
    orderBy: string
    filterBy: string
    seller?: string
    winner?: string
}

// Define the structure of actions that modify the state
type Actions = {
    setParams: (params: Partial<State>) => void
    reset: () => void
    setSearchValue: (value: string) => void
}

// Define the initial state values
const initialState: State = {
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: '',
    searchValue: '',
    orderBy: 'make',
    filterBy: 'live',
    seller: undefined,
    winner: undefined,
}

// Create a Zustand store to manage pagination state and actions
export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState, // Initialize the store with the default state

    // Function to update the state with new parameters
    setParams: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageNumber) {
                // If pageNumber is provided, update it explicitly
                return { ...state, pageNumber: newParams.pageNumber }
            } else {
                // Otherwise, update all provided parameters but reset pageNumber to 1
                // This avoid fetching items doesn't exist on the page that filtering 
                // options more than what we have. 
                return { ...state, ...newParams, pageNumber: 1 }
            }
        })
    },

    // Function to reset the state to its initial values
    reset: () => {
        set(initialState)
    },
    setSearchValue: (value: string) => {
        set({ searchValue: value })
    }
}))