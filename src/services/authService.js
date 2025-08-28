/**
 * Authentication service for user management
 */

// Mock user database (in a real app, this would be a backend service)
const USERS_STORAGE_KEY = 'bookFinderUsers';

/**
 * Get all users from local storage
 * @returns {Array} Array of user objects
 */
const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users from storage:', error);
    return [];
  }
};

/**
 * Save users to local storage
 * @param {Array} users - Array of user objects
 */
const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to storage:', error);
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registered user object
 */
export const register = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = getUsers();
        
        // Check if user already exists
        if (users.some(user => user.email === userData.email)) {
          return reject(new Error('User with this email already exists'));
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          password: userData.password, // In a real app, this would be hashed
          favorites: [],
          history: [],
          createdAt: new Date().toISOString()
        };
        
        // Add user to storage
        users.push(newUser);
        saveUsers(users);
        
        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      } catch (error) {
        reject(new Error('Registration failed: ' + error.message));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} Logged in user object
 */
export const login = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = getUsers();
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        
        if (!user) {
          return reject(new Error('Invalid email or password'));
        }
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } catch (error) {
        reject(new Error('Login failed: ' + error.message));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user object
 */
export const updateProfile = async (userId, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          return reject(new Error('User not found'));
        }
        
        // Update user data
        users[userIndex] = {
          ...users[userIndex],
          ...userData,
          updatedAt: new Date().toISOString()
        };
        
        saveUsers(users);
        
        // Return user without password
        const { password, ...userWithoutPassword } = users[userIndex];
        resolve(userWithoutPassword);
      } catch (error) {
        reject(new Error('Profile update failed: ' + error.message));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Update user favorites
 * @param {string} userId - User ID
 * @param {Array} favorites - Updated favorites list
 * @returns {Promise<Object>} Updated user object
 */
export const updateFavorites = async (userId, favorites) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          return reject(new Error('User not found'));
        }
        
        // Update favorites
        users[userIndex].favorites = favorites;
        users[userIndex].updatedAt = new Date().toISOString();
        
        saveUsers(users);
        
        // Return user without password
        const { password, ...userWithoutPassword } = users[userIndex];
        resolve(userWithoutPassword);
      } catch (error) {
        reject(new Error('Favorites update failed: ' + error.message));
      }
    }, 300); // Simulate network delay
  });
};