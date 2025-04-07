/**
 * Settings Data Model
 *
 * This file defines the data structure for the application settings,
 * including all settings sections, items, and their possible values.
 */

// Types for TypeScript support
/**
 * @typedef {Object} SettingsItem
 * @property {string} id - Unique identifier for the setting
 * @property {string} title - Display title for the setting
 * @property {string} [description] - Optional description of the setting
 * @property {string} [icon] - Icon name from Ionicons
 * @property {boolean} [isToggle] - Whether this setting is a toggle switch
 * @property {string[]} [options] - Array of options for selection settings
 * @property {Function} [onPress] - Function to call when the item is pressed
 * @property {boolean} [isDanger] - Whether this is a dangerous action (displayed in red)
 */

/**
 * @typedef {Object} SettingsSection
 * @property {string} id - Unique identifier for the section
 * @property {string} title - Display title for the section
 * @property {string} [icon] - Icon name from Ionicons
 * @property {string} [description] - Optional description of the section
 * @property {SettingsItem[]} items - Settings items in this section
 */

/**
 * @typedef {Object} ToggleStates
 * @property {boolean} darkMode - Whether dark mode is enabled
 * @property {boolean} pushNotifications - Whether push notifications are enabled
 * @property {boolean} emailNotifications - Whether email notifications are enabled
 * @property {boolean} studyReminders - Whether study reminders are enabled
 * @property {boolean} marketingCommunications - Whether marketing communications are enabled
 * @property {boolean} twoFactorAuth - Whether two-factor authentication is enabled
 */

/**
 * @typedef {Object} SelectedOptions
 * @property {string} fontSize - Selected font size option
 * @property {string} colorScheme - Selected color scheme option
 * @property {string} language - Selected language option
 */

// Settings Schema
export const SETTINGS_SCHEMA = {
    settings: {
      type: "object",
      description: "Application settings",
      properties: {
        toggleStates: {
          type: "object",
          description: "States of toggle settings",
          properties: {
            darkMode: {
              type: "boolean",
              description: "Whether dark mode is enabled",
              default: false,
            },
            pushNotifications: {
              type: "boolean",
              description: "Whether push notifications are enabled",
              default: true,
            },
            emailNotifications: {
              type: "boolean",
              description: "Whether email notifications are enabled",
              default: true,
            },
            studyReminders: {
              type: "boolean",
              description: "Whether study reminders are enabled",
              default: true,
            },
            marketingCommunications: {
              type: "boolean",
              description: "Whether marketing communications are enabled",
              default: false,
            },
            twoFactorAuth: {
              type: "boolean",
              description: "Whether two-factor authentication is enabled",
              default: false,
            },
          },
        },
        selectedOptions: {
          type: "object",
          description: "Selected options for settings with multiple choices",
          properties: {
            fontSize: {
              type: "string",
              description: "Selected font size option",
              options: ["Small", "Medium", "Large", "Extra Large"],
              default: "Medium",
            },
            colorScheme: {
              type: "string",
              description: "Selected color scheme option",
              options: ["System Default", "Light", "Dark", "Blue", "Purple"],
              default: "System Default",
            },
            language: {
              type: "string",
              description: "Selected language option",
              options: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
              default: "English",
            },
          },
        },
        sections: {
          type: "array",
          description: "Settings sections",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the section",
              },
              title: {
                type: "string",
                description: "Display title for the section",
              },
              icon: {
                type: "string",
                description: "Icon name from Ionicons",
                default: "settings-outline",
              },
              description: {
                type: "string",
                description: "Optional description of the section",
                default: "",
              },
              items: {
                type: "array",
                description: "Settings items in this section",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier for the setting",
                    },
                    title: {
                      type: "string",
                      description: "Display title for the setting",
                    },
                    description: {
                      type: "string",
                      description: "Optional description of the setting",
                      default: "",
                    },
                    icon: {
                      type: "string",
                      description: "Icon name from Ionicons",
                      default: "",
                    },
                    isToggle: {
                      type: "boolean",
                      description: "Whether this setting is a toggle switch",
                      default: false,
                    },
                    options: {
                      type: "array",
                      description: "Array of options for selection settings",
                      items: {
                        type: "string",
                      },
                      default: [],
                    },
                    isDanger: {
                      type: "boolean",
                      description: "Whether this is a dangerous action (displayed in red)",
                      default: false,
                    },
                  },
                  required: ["id", "title"],
                },
              },
            },
            required: ["id", "title", "items"],
          },
        },
        appInfo: {
          type: "object",
          description: "Application information",
          properties: {
            version: {
              type: "string",
              description: "Application version",
              default: "1.0.0",
            },
            buildNumber: {
              type: "string",
              description: "Application build number",
              default: "1",
            },
            copyright: {
              type: "string",
              description: "Copyright information",
              default: "© 2023 StudyVerse. All rights reserved.",
            },
          },
        },
      },
    },
  }
  
  /**
   * Creates a default settings data object
   * @returns {Object} Default settings data
   */
  export const createDefaultSettingsData = () => {
    return {
      toggleStates: {
        darkMode: false,
        pushNotifications: true,
        emailNotifications: true,
        studyReminders: true,
        marketingCommunications: false,
        twoFactorAuth: false,
      },
      selectedOptions: {
        fontSize: "Medium",
        colorScheme: "System Default",
        language: "English",
      },
      sections: getDefaultSettingsSections(),
      appInfo: {
        version: "1.0.0",
        buildNumber: "1",
        copyright: "© 2023 StudyVerse. All rights reserved.",
      },
    }
  }
  
  /**
   * Creates a settings section
   * @param {string} id - Section ID
   * @param {string} title - Section title
   * @param {string} icon - Section icon
   * @param {string} description - Section description
   * @param {Array} items - Section items
   * @returns {Object} Settings section
   */
  export const createSettingsSection = (id, title, icon = "settings-outline", description = "", items = []) => {
    return {
      id,
      title,
      icon,
      description,
      items,
    }
  }
  
  /**
   * Creates a settings item
   * @param {string} id - Item ID
   * @param {string} title - Item title
   * @param {Object} options - Additional options
   * @returns {Object} Settings item
   */
  export const createSettingsItem = (id, title, options = {}) => {
    return {
      id,
      title,
      description: options.description || "",
      icon: options.icon || "",
      isToggle: options.isToggle || false,
      options: options.options || [],
      isDanger: options.isDanger || false,
    }
  }
  
  /**
   * Returns the default settings sections
   * @returns {Array} Default settings sections
   */
  export const getDefaultSettingsSections = () => {
    return [
      createSettingsSection("appearance", "Appearance", "color-palette-outline", "Customize how the app looks", [
        createSettingsItem("darkMode", "Dark Mode", {
          isToggle: true,
          description: "Use dark theme throughout the app",
        }),
        createSettingsItem("fontSize", "Font Size", {
          options: ["Small", "Medium", "Large", "Extra Large"],
          description: "Adjust text size throughout the app",
        }),
        createSettingsItem("colorScheme", "Color Scheme", {
          options: ["System Default", "Light", "Dark", "Blue", "Purple"],
          description: "Choose your preferred color scheme",
        }),
      ]),
      createSettingsSection("account", "Account", "person-outline", "Manage your account details", [
        createSettingsItem("profile", "Profile Information", {
          description: "View and edit your profile details",
        }),
        createSettingsItem("email", "Email Address", {
          description: "Change your email address",
        }),
        createSettingsItem("subscription", "Subscription Plan", {
          description: "Manage your subscription",
        }),
        createSettingsItem("deleteAccount", "Delete Account", {
          isDanger: true,
          description: "Permanently delete your account and all data",
        }),
      ]),
      createSettingsSection("security", "Security", "shield-checkmark-outline", "Manage your account security", [
        createSettingsItem("password", "Change Password", {
          description: "Update your password",
        }),
        createSettingsItem("twoFactorAuth", "Two-Factor Authentication", {
          isToggle: true,
          description: "Add an extra layer of security to your account",
        }),
        createSettingsItem("activeSessions", "Active Sessions", {
          description: "View and manage your active sessions",
        }),
      ]),
      createSettingsSection(
        "notifications",
        "Notifications",
        "notifications-outline",
        "Control how you receive notifications",
        [
          createSettingsItem("pushNotifications", "Push Notifications", {
            isToggle: true,
            description: "Receive notifications on your device",
          }),
          createSettingsItem("emailNotifications", "Email Notifications", {
            isToggle: true,
            description: "Receive notifications via email",
          }),
          createSettingsItem("studyReminders", "Study Reminders", {
            isToggle: true,
            description: "Get reminders for your study sessions",
          }),
          createSettingsItem("marketingCommunications", "Marketing Communications", {
            isToggle: true,
            description: "Receive updates about new features and offers",
          }),
        ],
      ),
      createSettingsSection("language", "Language", "language-outline", "Choose your preferred language", [
        createSettingsItem("language", "App Language", {
          options: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
          description: "Set the language for the app interface",
        }),
      ]),
      createSettingsSection("actions", "Account Actions", "log-out-outline", "Actions related to your account", [
        createSettingsItem("editProfile", "Edit Profile", {
          description: "Update your profile information",
        }),
        createSettingsItem("changePassword", "Change Password", {
          description: "Update your password",
        }),
        createSettingsItem("signOut", "Sign Out", {
          description: "Sign out of your account",
        }),
      ]),
    ]
  }
  
  /**
   * Validates settings data against the schema
   * @param {Object} data - Settings data to validate
   * @returns {Object} Validation result with isValid flag and errors array
   */
  export const validateSettingsData = (data) => {
    const errors = []
  
    // Check if required properties exist
    if (!data.toggleStates) errors.push("Missing toggleStates")
    if (!data.selectedOptions) errors.push("Missing selectedOptions")
    if (!data.sections) errors.push("Missing sections")
  
    // Validate toggle states
    const requiredToggles = [
      "darkMode",
      "pushNotifications",
      "emailNotifications",
      "studyReminders",
      "marketingCommunications",
      "twoFactorAuth",
    ]
    if (data.toggleStates) {
      requiredToggles.forEach((toggle) => {
        if (typeof data.toggleStates[toggle] !== "boolean") {
          errors.push(`Invalid toggle state for ${toggle}`)
        }
      })
    }
  
    // Validate selected options
    const requiredOptions = [
      { key: "fontSize", validValues: ["Small", "Medium", "Large", "Extra Large"] },
      { key: "colorScheme", validValues: ["System Default", "Light", "Dark", "Blue", "Purple"] },
      { key: "language", validValues: ["English", "Spanish", "French", "German", "Chinese", "Japanese"] },
    ]
  
    if (data.selectedOptions) {
      requiredOptions.forEach((option) => {
        if (!data.selectedOptions[option.key]) {
          errors.push(`Missing selected option for ${option.key}`)
        } else if (!option.validValues.includes(data.selectedOptions[option.key])) {
          errors.push(`Invalid value for ${option.key}: ${data.selectedOptions[option.key]}`)
        }
      })
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Updates a toggle setting value
   * @param {Object} settings - Current settings object
   * @param {string} settingId - ID of the setting to update
   * @param {boolean} value - New toggle value
   * @returns {Object} Updated settings object
   */
  export const updateToggleSetting = (settings, settingId, value) => {
    if (!settings.toggleStates.hasOwnProperty(settingId)) {
      console.warn(`Toggle setting ${settingId} does not exist`)
      return settings
    }
  
    return {
      ...settings,
      toggleStates: {
        ...settings.toggleStates,
        [settingId]: value,
      },
    }
  }
  
  /**
   * Updates a selected option setting value
   * @param {Object} settings - Current settings object
   * @param {string} settingId - ID of the setting to update
   * @param {string} value - New selected option value
   * @returns {Object} Updated settings object
   */
  export const updateSelectedOption = (settings, settingId, value) => {
    if (!settings.selectedOptions.hasOwnProperty(settingId)) {
      console.warn(`Selected option setting ${settingId} does not exist`)
      return settings
    }
  
    return {
      ...settings,
      selectedOptions: {
        ...settings.selectedOptions,
        [settingId]: value,
      },
    }
  }
  
  /**
   * Gets the current value of a setting by its ID
   * @param {Object} settings - Current settings object
   * @param {string} settingId - ID of the setting to get
   * @returns {any} Current value of the setting
   */
  export const getSettingValue = (settings, settingId) => {
    if (settings.toggleStates.hasOwnProperty(settingId)) {
      return settings.toggleStates[settingId]
    }
  
    if (settings.selectedOptions.hasOwnProperty(settingId)) {
      return settings.selectedOptions[settingId]
    }
  
    console.warn(`Setting ${settingId} not found`)
    return null
  }
  
  /**
   * Exports all settings to a JSON string for backup
   * @param {Object} settings - Current settings object
   * @returns {string} JSON string of settings
   */
  export const exportSettingsToJSON = (settings) => {
    return JSON.stringify(
      {
        toggleStates: settings.toggleStates,
        selectedOptions: settings.selectedOptions,
        appInfo: settings.appInfo,
      },
      null,
      2,
    )
  }
  
  