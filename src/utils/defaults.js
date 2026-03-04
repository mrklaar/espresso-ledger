export const defaultProfile = {
  machine: '',
  grinder: '',
  equipment: {
    wdt: false,
    rdt: false,
    blindShaker: false,
    meshScreen: false,
    paperFilterTop: false,
    paperFilterBottom: false,
    distributor: false,
    tamper: 'standard',
  },
  defaults: {
    dose: 18,
    targetYield: 36,
    temperature: 93,
    grindSetting: '',
  },
};

export function createEmptyShot(profile) {
  const defaults = profile?.defaults || defaultProfile.defaults;
  return {
    id: '',
    date: new Date().toISOString().slice(0, 16),
    beanName: '',
    roaster: '',
    origin: '',
    roastLevel: 'medium',
    roastDate: '',
    process: '',
    dose: defaults.dose,
    yield: defaults.targetYield,
    brewRatio: '',
    grindSetting: defaults.grindSetting,
    temperature: defaults.temperature,
    extractionTime: 25,
    preInfusion: false,
    preInfusionTime: 0,
    preInfusionPressure: '',
    equipmentUsed: {
      wdt: profile?.equipment?.wdt || false,
      rdt: profile?.equipment?.rdt || false,
      blindShaker: profile?.equipment?.blindShaker || false,
      meshScreen: profile?.equipment?.meshScreen || false,
      paperFilterTop: profile?.equipment?.paperFilterTop || false,
      paperFilterBottom: profile?.equipment?.paperFilterBottom || false,
      distributor: profile?.equipment?.distributor || false,
    },
    acidity: 3,
    sweetness: 3,
    body: 3,
    bitterness: 3,
    flavorNotes: '',
    channeling: false,
    cremaQuality: 'good',
    rating: 3,
    notes: '',
  };
}

export const roastLevels = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];
export const processes = ['washed', 'natural', 'honey', 'anaerobic', 'carbonic maceration', 'other'];
export const cremaQualities = ['none', 'thin', 'good', 'thick', 'tiger-striped'];
