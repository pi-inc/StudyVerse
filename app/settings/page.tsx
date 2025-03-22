"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Lock,
  Eye,
  EyeOff,
  Save,
  Palette,
  Volume2,
  VolumeX,
  Check,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [colorTheme, setColorTheme] = useState("purple")
  const [language, setLanguage] = useState("english")
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold gradient-text mb-6">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="border-none shadow-md overflow-hidden lg:col-span-1">
            <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-study-purple" />
                Settings
              </CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto pb-2">
                <div className="grid grid-cols-4 w-full max-w-[400px] bg-muted rounded-md p-1">
                  <Button
                    variant={activeTab === "account" ? "secondary" : "ghost"}
                    className="justify-start col-span-1"
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "secondary" : "ghost"}
                    className="justify-start col-span-1"
                    onClick={() => setActiveTab("security")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "secondary" : "ghost"}
                    className="justify-start col-span-1"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "appearance" ? "secondary" : "ghost"}
                    className="justify-start col-span-1"
                    onClick={() => setActiveTab("appearance")}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "account" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-purple to-study-blue" />
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Computer Science student passionate about learning new technologies."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <RadioGroup value={language} onValueChange={setLanguage} className="flex flex-wrap gap-4">
                      {[
                        { value: "english", label: "English" },
                        { value: "spanish", label: "Spanish" },
                        { value: "french", label: "French" },
                        { value: "german", label: "German" },
                        { value: "chinese", label: "Chinese" },
                      ].map((lang) => (
                        <div key={lang.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={lang.value} id={lang.value} />
                          <Label htmlFor={lang.value}>{lang.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-gradient-to-r from-study-purple to-study-blue text-white"
                    onClick={handleSaveSettings}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-blue to-study-teal" />
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        defaultValue="password123"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input id="new-password" type={showNewPassword ? "text" : "password"} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-gradient-to-r from-study-blue to-study-teal text-white"
                    onClick={handleSaveSettings}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-teal to-study-green" />
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        {
                          id: "email-all",
                          label: "All email notifications",
                          description: "Receive all email notifications",
                        },
                        {
                          id: "email-course",
                          label: "Course updates",
                          description: "New lessons, quizzes, and materials",
                        },
                        {
                          id: "email-reminder",
                          label: "Study reminders",
                          description: "Daily and weekly study reminders",
                        },
                        {
                          id: "email-achievement",
                          label: "Achievements",
                          description: "When you earn new badges or achievements",
                        },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor={item.id}>{item.label}</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch id={item.id} checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        {
                          id: "push-all",
                          label: "All push notifications",
                          description: "Receive all push notifications",
                        },
                        { id: "push-reminder", label: "Study reminders", description: "Daily study reminders" },
                        {
                          id: "push-deadline",
                          label: "Upcoming deadlines",
                          description: "Notifications for approaching deadlines",
                        },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor={item.id}>{item.label}</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch id={item.id} checked={pushNotifications} onCheckedChange={setPushNotifications} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for achievements and notifications</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="mr-2"
                      >
                        {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                      <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-gradient-to-r from-study-teal to-study-green text-white"
                    onClick={handleSaveSettings}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-study-green to-study-yellow" />
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how StudyVerse looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={darkMode ? "outline" : "default"}
                        className="flex items-center gap-2"
                        onClick={() => setDarkMode(false)}
                      >
                        <Sun className="h-4 w-4" />
                        Light
                        {!darkMode && <Check className="h-4 w-4 ml-1" />}
                      </Button>
                      <Button
                        variant={darkMode ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => setDarkMode(true)}
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                        {darkMode && <Check className="h-4 w-4 ml-1" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Color Theme</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: "purple", label: "Purple", color: "bg-study-purple" },
                        { id: "blue", label: "Blue", color: "bg-study-blue" },
                        { id: "teal", label: "Teal", color: "bg-study-teal" },
                        { id: "green", label: "Green", color: "bg-study-green" },
                      ].map((theme) => (
                        <div
                          key={theme.id}
                          className={`flex flex-col items-center gap-2 p-3 rounded-md cursor-pointer border-2 transition-all ${
                            colorTheme === theme.id ? "border-primary" : "border-transparent hover:border-muted"
                          }`}
                          onClick={() => setColorTheme(theme.id)}
                        >
                          <div className={`h-8 w-8 rounded-full ${theme.color}`}></div>
                          <span className="text-sm">{theme.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Font Size</h3>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        Small
                      </Button>
                      <Button variant="default" size="sm">
                        Medium
                      </Button>
                      <Button variant="outline" size="sm">
                        Large
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable animations throughout the app</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-gradient-to-r from-study-green to-study-yellow text-white"
                    onClick={handleSaveSettings}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

