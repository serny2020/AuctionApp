import { create } from "zustand"
 
// Define the structure of the state managed by Zustand
 type State = {
     pageNumber: number
     pageSize: number
     pageCount: number
     searchTerm: string
 }
 
 // Define the structure of actions that modify the state
 type Actions = {
     setParams: (params: Partial<State>) => void
     reset: () => void
 }
 
 // Define the initial state values
 const initialState: State = {
     pageNumber: 1,
     pageSize: 12,
     pageCount: 1,
     searchTerm: '',
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
                // This avoid fetching items doesn't exist on last page if with filtering 
                // options more than what it has. 
                return { ...state, ...newParams, pageNumber: 1 }
            }
        })
    },

    // Function to reset the state to its initial values
    reset: () => {
        set(initialState)
    },
}))