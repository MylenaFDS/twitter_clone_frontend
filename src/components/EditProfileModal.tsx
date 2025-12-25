import { useState } from "react";
import "../styles/edit-profile-modal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    bio: string;
    avatar: string;
    banner: string;
  };
  onSaveProfile: (data: {
    bio?: string;
    avatar?: File | null;
    banner?: File | null;
  }) => Promise<void>;
  onChangePassword: (data: {
    old_password: string;
    new_password: string;
  }) => Promise<void>;
};

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSaveProfile,
  onChangePassword,
}: Props) {
  const [bio, setBio] = useState(user.bio);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [bannerPreview, setBannerPreview] = useState(user.banner);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function handleAvatarChange(file: File) {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleBannerChange(file: File) {
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    setLoading(true);
    try {
      await onSaveProfile({
        bio,
        avatar: avatarFile,
        banner: bannerFile,
      });

      if (oldPassword && newPassword) {
        await onChangePassword({
          old_password: oldPassword,
          new_password: newPassword,
        });
      }

      onClose();
    } catch {
      alert("Erro ao salvar perfil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h3>Editar perfil</h3>
          <button onClick={onClose}>✕</button>
        </header>

        <div className="modal-content">
          {/* Banner */}
          <label>
            Banner
            {bannerPreview && (
              <img src={bannerPreview} className="banner-preview" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleBannerChange(e.target.files[0])
              }
            />
          </label>

          {/* Avatar */}
          <label>
            Avatar
            {avatarPreview && (
              <img src={avatarPreview} className="avatar-preview" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleAvatarChange(e.target.files[0])
              }
            />
          </label>

          {/* Bio */}
          <label>
            Bio
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
            />
            <span className="char-count">{bio.length}/160</span>
          </label>

          {/* Senha */}
          <label>
            Senha atual
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>

          <label>
            Nova senha
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>

        <footer className="modal-footer">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </footer>
      </div>
    </div>
  );
}

