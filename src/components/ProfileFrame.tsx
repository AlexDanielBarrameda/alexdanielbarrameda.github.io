import { profileImageAlt, profileImageUrl } from "../data";

const RIPPLE_COUNT = 4;

export default function ProfileFrame() {
  const hasImage = Boolean(profileImageUrl);

  return (
    <div className="profile" aria-hidden={hasImage ? undefined : true}>
      <span className="profile__ripples" aria-hidden="true">
        {Array.from({ length: RIPPLE_COUNT }, (_, i) => (
          <span key={i} className="profile__ripple" />
        ))}
      </span>

      <div className="profile__frame">
        <div className="profile__face">
          {hasImage ? (
            <img className="profile__img" src={profileImageUrl!} alt={profileImageAlt} />
          ) : (
            <>
              <svg className="profile__slash" viewBox="0 0 130 130" focusable="false" aria-hidden="true">
                <circle cx="65" cy="65" r="52" />
                <line x1="23" y1="107" x2="107" y2="23" />
              </svg>
              <span className="profile__initials">YN</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
