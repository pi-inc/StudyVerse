"use client"

import { useState } from "react"
import { Bell, Moon, Sun, Lock, Eye, EyeOff, Save, Palette, Volume2, VolumeX, Check, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { toast } = useToast()

  // Get theme settings from context
  const { theme, setTheme, colorTheme, setColorTheme, fontSize, setFontSize, animations, setAnimations } = useTheme()

  // Replace slider with simple buttons for difficulty level
  const [difficulty, setDifficulty] = useState("medium")

  // Replace slider with simple buttons for daily goal
  const [dailyGoal, setDailyGoal] = useState(20)

  // Define color themes
  const colorThemes = [
    {
      id: "purple",
      label: "Purple",
      color: "bg-study-purple",
      textColor: "text-study-purple",
      gradient: "from-study-purple to-study-blue",
    },
    {
      id: "blue",
      label: "Blue",
      color: "bg-study-blue",
      textColor: "text-study-blue",
      gradient: "from-study-blue to-study-teal",
    },
    {
      id: "teal",
      label: "Teal",
      color: "bg-study-teal",
      textColor: "text-study-teal",
      gradient: "from-study-teal to-study-green",
    },
    {
      id: "green",
      label: "Green",
      color: "bg-study-green",
      textColor: "text-study-green",
      gradient: "from-study-green to-study-yellow",
    },
  ]

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
      className: "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green",
    })
  }

  // Get current theme gradient
  const currentGradient = colorThemes.find((t) => t.id === colorTheme)?.gradient || "from-study-purple to-study-blue"
  const currentTextColor = colorThemes.find((t) => t.id === colorTheme)?.textColor || "text-study-purple"

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="opacity-100 transform translate-y-0 transition-all duration-500">
        <h1 className="text-3xl font-bold gradient-text mb-6">Settings</h1>

        <div className="grid grid-cols-1 gap-6">
          <Accordion type="single" collapsible defaultValue="appearance" className="w-full space-y-4">
            {/* Account Settings */}
            <div className="border-none rounded-lg overflow-hidden shadow-md">
              <div className={`h-1 bg-gradient-to-r ${currentGradient}`} />
              <AccordionItem value="account" className="border-0">
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User className={currentTextColor} />
                    <AccordionTrigger className="hover:no-underline font-semibold text-lg">
                      Account Settings
                    </AccordionTrigger>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">Manage your account information</p>
                </div>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
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
                      <RadioGroup defaultValue="english" className="flex flex-wrap gap-4">
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

                    <div className="pt-4">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/onboarding">Restart Onboarding</Link>
                      </Button>
                    </div>

                    <div className="pt-4">
                      <Button className={`bg-gradient-to-r ${currentGradient} text-white`} onClick={handleSaveSettings}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Security Settings */}
            <div className="border-none rounded-lg overflow-hidden shadow-md">
              <div className={`h-1 bg-gradient-to-r ${currentGradient}`} />
              <AccordionItem value="security" className="border-0">
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Lock className={currentTextColor} />
                    <AccordionTrigger className="hover:no-underline font-semibold text-lg">
                      Security Settings
                    </AccordionTrigger>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">Manage your password and security preferences</p>
                </div>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
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
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
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

                    <div className="pt-4">
                      <Button className={`bg-gradient-to-r ${currentGradient} text-white`} onClick={handleSaveSettings}>
                        <Save className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Notification Settings */}
            <div className="border-none rounded-lg overflow-hidden shadow-md">
              <div className={`h-1 bg-gradient-to-r ${currentGradient}`} />
              <AccordionItem value="notifications" className="border-0">
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Bell className={currentTextColor} />
                    <AccordionTrigger className="hover:no-underline font-semibold text-lg">
                      Notification Settings
                    </AccordionTrigger>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">Manage how you receive notifications</p>
                </div>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
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

                    <div className="pt-4">
                      <Button className={`bg-gradient-to-r ${currentGradient} text-white`} onClick={handleSaveSettings}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Appearance Settings */}
            <div className="border-none rounded-lg overflow-hidden shadow-md">
              <div className={`h-1 bg-gradient-to-r ${currentGradient}`} />
              <AccordionItem value="appearance" className="border-0">
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Palette className={currentTextColor} />
                    <AccordionTrigger className="hover:no-underline font-semibold text-lg">
                      Appearance Settings
                    </AccordionTrigger>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">Customize how StudyVerse looks</p>
                </div>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-4 w-4" />
                          Light
                          {theme === "light" && <Check className="h-4 w-4 ml-1" />}
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                          {theme === "dark" && <Check className="h-4 w-4 ml-1" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Color Theme</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {colorThemes.map((themeOption) => (
                          <button
                            key={themeOption.id}
                            className={cn(
                              "flex flex-col items-center gap-2 p-3 rounded-md cursor-pointer border-2 relative",
                              colorTheme === themeOption.id
                                ? "border-primary"
                                : "border-transparent hover:border-muted",
                            )}
                            onClick={() => setColorTheme(themeOption.id as any)}
                            type="button"
                          >
                            <div className={`h-8 w-8 rounded-full ${themeOption.color}`}></div>
                            <span className="text-sm">{themeOption.label}</span>
                            {colorTheme === themeOption.id && (
                              <Check className={`h-4 w-4 absolute top-2 right-2 ${themeOption.textColor}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Font Size</h3>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={fontSize === "small" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFontSize("small")}
                        >
                          Small
                        </Button>
                        <Button
                          variant={fontSize === "medium" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFontSize("medium")}
                        >
                          Medium
                        </Button>
                        <Button
                          variant={fontSize === "large" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFontSize("large")}
                        >
                          Large
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Difficulty Level</h3>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={difficulty === "easy" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDifficulty("easy")}
                        >
                          Easy
                        </Button>
                        <Button
                          variant={difficulty === "medium" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDifficulty("medium")}
                        >
                          Medium
                        </Button>
                        <Button
                          variant={difficulty === "hard" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDifficulty("hard")}
                        >
                          Hard
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Daily Goal</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {[5, 10, 20, 30, 50].map((goal) => (
                          <Button
                            key={goal}
                            variant={dailyGoal === goal ? "default" : "outline"}
                            size="sm"
                            onClick={() => setDailyGoal(goal)}
                          >
                            {goal} items
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Animations</Label>
                        <p className="text-sm text-muted-foreground">Enable animations throughout the app</p>
                      </div>
                      <Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
                    </div>

                    <div className="pt-4">
                      <Button className={`bg-gradient-to-r ${currentGradient} text-white`} onClick={handleSaveSettings}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Appearance
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

