import { useState } from "react";
import "../styles/edit-profile-modal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    bio?: string;
    avatar?: string;
    banner?: string;
  };
  onSave: (data: {
    bio: string;
    avatar: string;
    banner: string;
  }) => Promise<void> | void;
};

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}: Props) {
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatar, setAvatar] = useState(user.avatar ?? "");
  const [banner, setBanner] = useState(user.banner ?? "");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSave() {
    setLoading(true);
    try {
      await onSave({ bio, avatar, banner });
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
          <label>
            Banner (URL)
            <input
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label>
            Avatar (URL)
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label>
            Bio
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
            />
            <span className="char-count">{bio.length}/160</span>
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
