import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-3xl font-bold font-display">Settings</h1>
      <p className="text-muted-foreground">Configure your application settings.</p>
    </header>
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-secondary/50">
      <SettingsIcon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Settings Page Coming Soon</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        This section is under construction. Soon you'll be able to manage your profile, notifications, and other application settings here.
      </p>
    </div>
  </div>
);
export default Settings;