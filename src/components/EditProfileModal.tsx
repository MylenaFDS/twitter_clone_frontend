import { useState } from "react";
import "../styles/edit-profile-modal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string;
    bio?: string;
    avatar?: string;
    banner?: string;
  };
  onSaveProfile: (data: {
    username: string;
    bio: string;
    avatar: string;
    banner: string;
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
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatar, setAvatar] = useState(user.avatar ?? "");
  const [banner, setBanner] = useState(user.banner ?? "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSave() {
    if (newPassword && newPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      // 🔹 Atualiza perfil
      await onSaveProfile({
        username,
        bio,
        avatar,
        banner,
      });

      // 🔹 Atualiza senha (se preenchida)
      if (newPassword) {
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
          <label>
            Nome de usuário
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Banner (URL)
            <input
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
            />
          </label>

          <label>
            Avatar (URL)
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
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

          <hr />

          <h4>Alterar senha</h4>

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

          <label>
            Confirmar nova senha
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>

        <footer className="modal-footer">
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </footer>
      </div>
    </div>
  );
}
