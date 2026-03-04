const SHOTS_KEY = 'espresso-ledger-shots';
const PROFILE_KEY = 'espresso-ledger-profile';

export function loadShots() {
  try {
    const data = localStorage.getItem(SHOTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveShots(shots) {
  localStorage.setItem(SHOTS_KEY, JSON.stringify(shots));
}

export function loadProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
