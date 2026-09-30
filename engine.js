// SkiMath engine - ski setup math. Pure functions, no DOM.
(function (root) {
  'use strict';

  // Release-value estimate from weight band + skier type (1 cautious, 2 moderate, 3 aggressive).
  // Simplified from the published chart's mid band; always confirm with a shop test.
  function dinEstimate(weightKg, type) {
    if (weightKg <= 0) throw new Error('weight must be positive');
    if (type < 1 || type > 3) throw new Error('type is 1, 2, or 3');
    var base;
    if (weightKg < 22) base = 0.75;
    else if (weightKg < 30) base = 1.5;
    else if (weightKg < 39) base = 2.25;
    else if (weightKg < 48) base = 3;
    else if (weightKg < 57) base = 3.75;
    else if (weightKg < 67) base = 4.5;
    else if (weightKg < 78) base = 5.5;
    else if (weightKg < 94) base = 6.5;
    else if (weightKg < 110) base = 7.5;
    else base = 8.5;
    var v = base + (type - 2) * 0.75;
    return Math.max(0.75, Math.round(v * 4) / 4);
  }

  function dinNote(weightKg, age) {
    if (age >= 50) return 'over 50: the chart steps one band down - older legs prefer earlier release';
    if (weightKg < 22) return 'child band - a shop test is mandatory, not optional';
    return 'estimate from the mid chart band - a shop torque test is the authority';
  }

  // Kick/glide wax band by snow temperature (C). Classic grip-wax style bands.
  function waxBand(snowC) {
    if (snowC < -20) return 'extra green (special cold) - scrape and brush hard';
    if (snowC < -10) return 'green (CH4 / VR20) - the cold-snow workhorse';
    if (snowC < -6) return 'blue (CH6 / VR30)';
    if (snowC < -2) return 'violet (VR45) - the transition band';
    if (snowC <= 0) return 'red (CH8 / VR55) - near-zero magic';
    if (snowC <= 3) return 'yellow / universal (CH10) - wet new snow';
    return 'klister territory - cover the grip zone, no wax will hold';
  }

  // Edge bevel guide by level. Returns {base, side, note}.
  function edgeGuide(level) {
    if (level === 'race') return { base: 0.5, side: 87, note: '0.5 base / 87 side - bites hard, punishes lazy skiing' };
    if (level === 'advanced') return { base: 0.75, side: 88, note: '0.75 base / 88 side - grip without the twitch' };
    return { base: 1, side: 89, note: '1 base / 89 side - forgiving and durable, the sensible default' };
  }

  // Ski length recommendation (cm) from height, skill, and style.
  function skiLength(heightCm, skill, style) {
    if (heightCm <= 0) throw new Error('height must be positive');
    var adj;
    if (skill === 'beginner') adj = -12;
    else if (skill === 'intermediate') adj = -6;
    else adj = -2;
    if (style === 'powder') adj += 8;
    else if (style === 'park') adj -= 4;
    return heightCm + adj;
  }

  var api = {
    dinEstimate: dinEstimate,
    dinNote: dinNote,
    waxBand: waxBand,
    edgeGuide: edgeGuide,
    skiLength: skiLength
  };
  root.SkiMath = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
