import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Save, User, FileText, Loader2 } from "lucide-react";

type SectionContent = {
  section_key: string;
  content: Record<string, string>;
};

const SECTIONS = [
  { key: "hero", label: "Hero Section", fields: ["heading", "subheading", "name"] },
  { key: "about", label: "About Section", fields: ["paragraph1", "paragraph2", "highlight"] },
  { key: "experience", label: "Experience", fields: ["role", "company", "duration"] },
  { key: "footer", label: "Footer", fields: ["tagline"] },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [contents, setContents] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string }>({
    display_name: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    // Load site content
    supabase
      .from("site_content")
      .select("*")
      .then(({ data }) => {
        if (data) {
          const map: Record<string, Record<string, string>> = {};
          data.forEach((row) => {
            map[row.section_key] = (row.content as Record<string, string>) || {};
          });
          setContents(map);
        }
        setLoadingContent(false);
      });

    // Load profile
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile({ display_name: data.display_name || "", avatar_url: data.avatar_url || "" });
        }
      });
  }, [user]);

  const saveSection = async (key: string) => {
    setSaving(key);
    const content = contents[key] || {};

    // Upsert via edge: try update first, then insert
    const { data: existing } = await supabase
      .from("site_content")
      .select("id")
      .eq("section_key", key)
      .single();

    if (existing) {
      const { error } = await supabase
        .from("site_content")
        .update({ content, updated_by: user?.id })
        .eq("section_key", key);
      if (error) toast.error(error.message);
      else toast.success(`${key} section saved!`);
    } else {
      const { error } = await supabase
        .from("site_content")
        .insert({ section_key: key, content, updated_by: user?.id });
      if (error) toast.error(error.message);
      else toast.success(`${key} section created!`);
    }
    setSaving(null);
  };

  const saveProfile = async () => {
    setSaving("profile");
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: profile.display_name, avatar_url: profile.avatar_url })
      .eq("user_id", user!.id);
    if (error) toast.error(error.message);
    else toast.success("Profile updated!");
    setSaving(null);
  };

  if (authLoading || loadingContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-display font-semibold text-sm">Admin Dashboard</p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate("/");
            }}
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Card */}
        <div className="card-glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-foreground">Profile</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Display Name</label>
              <input
                value={profile.display_name}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Avatar URL</label>
              <input
                value={profile.avatar_url}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <button
            onClick={saveProfile}
            disabled={saving === "profile"}
            className="btn-primary mt-4 text-sm inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving === "profile" ? "Saving..." : "Save Profile"}
          </button>
        </div>

        {/* Content Sections */}
        {SECTIONS.map((section) => (
          <div key={section.key} className="card-glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-foreground">{section.label}</h2>
            </div>
            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field}>
                  <label className="text-xs text-muted-foreground mb-1 block capitalize">{field}</label>
                  <textarea
                    value={contents[section.key]?.[field] || ""}
                    onChange={(e) =>
                      setContents((prev) => ({
                        ...prev,
                        [section.key]: { ...(prev[section.key] || {}), [field]: e.target.value },
                      }))
                    }
                    rows={field.includes("paragraph") ? 3 : 1}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => saveSection(section.key)}
              disabled={saving === section.key}
              className="btn-primary mt-4 text-sm inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving === section.key ? "Saving..." : "Save"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
