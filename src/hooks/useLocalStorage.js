import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[value, setValue]} - Current value and setter function
 */
export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom hook for managing multiple localStorage keys as an object
 * @param {Object} initialState - Object with key-value pairs for localStorage
 * @param {string} keyPrefix - Prefix for all localStorage keys
 * @returns {[state, updateState]} - Current state and update function
 */
export const useLocalStorageState = (initialState, keyPrefix = 'devjourney') => {
  const [state, setState] = useState(() => {
    const savedState = {};
    Object.keys(initialState).forEach(key => {
      try {
        const item = window.localStorage.getItem(`${keyPrefix}-${key}`);
        savedState[key] = item ? JSON.parse(item) : initialState[key];
      } catch (error) {
        console.error(`Error reading localStorage key "${keyPrefix}-${key}":`, error);
        savedState[key] = initialState[key];
      }
    });
    return savedState;
  });

  const updateState = (updates) => {
    setState(prevState => {
      const newState = { ...prevState, ...updates };
      
      // Update localStorage for changed keys
      Object.keys(updates).forEach(key => {
        try {
          window.localStorage.setItem(`${keyPrefix}-${key}`, JSON.stringify(newState[key]));
        } catch (error) {
          console.error(`Error setting localStorage key "${keyPrefix}-${key}":`, error);
        }
      });
      
      return newState;
    });
  };

  // Sync localStorage when state changes
  useEffect(() => {
    Object.keys(state).forEach(key => {
      try {
        window.localStorage.setItem(`${keyPrefix}-${key}`, JSON.stringify(state[key]));
      } catch (error) {
        console.error(`Error syncing localStorage key "${keyPrefix}-${key}":`, error);
      }
    });
  }, [state, keyPrefix]);

  return [state, updateState];
};

/**
 * Custom hook for managing array data in localStorage
 * @param {string} key - The localStorage key
 * @param {Array} initialArray - Initial array if key doesn't exist
 * @returns {[array, addItem, removeItem, updateItem, clearArray]} - Array and manipulation functions
 */
export const useLocalStorageArray = (key, initialArray = []) => {
  const [array, setArray] = useLocalStorage(key, initialArray);

  const addItem = (item) => {
    setArray(prev => [...prev, { id: Date.now(), ...item }]);
  };

  const removeItem = (id) => {
    setArray(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id, updates) => {
    setArray(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const clearArray = () => {
    setArray([]);
  };

  return [array, addItem, removeItem, updateItem, clearArray];
};

export default useLocalStorage;