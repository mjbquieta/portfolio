<script setup lang="ts">
import { computed } from "vue";

interface Skill {
  name: string;
  icon: string;
  level: number;
}

const props = defineProps<{
  skills: Skill[];
  title?: string;
  maxLevel?: number; // Allow customizing max level (default 100)
}>();

const maxLevel = computed(() => props.maxLevel ?? 100);
const totalSkills = computed(() => props.skills.length);
const angleStep = computed(() => (2 * Math.PI) / totalSkills.value);

// Calculate position for each skill around the circle
const skillPositions = computed(() => {
  const radius = 42; // percentage from center
  const iconRadius = 48; // slightly further out for icons

  return props.skills.map((skill, index) => {
    // Start from top (-90 degrees) and go clockwise
    const angle = angleStep.value * index - Math.PI / 2;

    return {
      ...skill,
      // Position for the radar point (based on skill level, now 0-100)
      pointX: 50 + (radius * (skill.level / maxLevel.value)) * Math.cos(angle),
      pointY: 50 + (radius * (skill.level / maxLevel.value)) * Math.sin(angle),
      // Position for the icon (fixed radius)
      iconX: 50 + iconRadius * Math.cos(angle),
      iconY: 50 + iconRadius * Math.sin(angle),
      // Position for the label
      labelX: 50 + (iconRadius + 8) * Math.cos(angle),
      labelY: 50 + (iconRadius + 8) * Math.sin(angle),
      angle: (angle * 180) / Math.PI,
    };
  });
});

// Generate the radar polygon path
const radarPath = computed(() => {
  const points = skillPositions.value
    .map((s) => `${s.pointX},${s.pointY}`)
    .join(" ");
  return points;
});

// Generate grid lines (concentric polygons) - 5 levels representing 20%, 40%, 60%, 80%, 100%
const gridLevels = [20, 40, 60, 80, 100];

const getGridPath = (level: number) => {
  const radius = 42 * (level / maxLevel.value);
  const points = props.skills
    .map((_, index) => {
      const angle = angleStep.value * index - Math.PI / 2;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");
  return points;
};

// Generate axis lines from center to each skill
const axisLines = computed(() => {
  const radius = 42;
  return props.skills.map((_, index) => {
    const angle = angleStep.value * index - Math.PI / 2;
    return {
      x2: 50 + radius * Math.cos(angle),
      y2: 50 + radius * Math.sin(angle),
    };
  });
});
</script>

<template>
  <div class="skills-radar">
    <h3 v-if="title" class="radar-title">{{ title }}</h3>

    <div class="radar-container">
      <svg viewBox="0 0 100 100" class="radar-svg">
        <defs>
          <!-- Gradient for the radar fill -->
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #06b6d4; stop-opacity: 0.8" />
            <stop offset="100%" style="stop-color: #6366f1; stop-opacity: 0.6" />
          </linearGradient>

          <!-- Glow filter -->
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Grid circles/polygons -->
        <polygon
          v-for="level in gridLevels"
          :key="level"
          :points="getGridPath(level)"
          class="grid-polygon"
          :class="{ 'grid-outer': level === 100 }"
        />

        <!-- Axis lines -->
        <line
          v-for="(axis, index) in axisLines"
          :key="'axis-' + index"
          x1="50"
          y1="50"
          :x2="axis.x2"
          :y2="axis.y2"
          class="axis-line"
        />

        <!-- Radar fill area -->
        <polygon
          :points="radarPath"
          class="radar-fill"
          filter="url(#glow)"
        />

        <!-- Radar outline -->
        <polygon
          :points="radarPath"
          class="radar-outline"
        />

        <!-- Skill points -->
        <circle
          v-for="(skill, index) in skillPositions"
          :key="'point-' + index"
          :cx="skill.pointX"
          :cy="skill.pointY"
          r="1.2"
          class="skill-point"
        />
      </svg>

      <!-- Skill icons positioned around the chart -->
      <div
        v-for="(skill, index) in skillPositions"
        :key="'icon-' + index"
        class="skill-icon-container"
        :style="{
          left: `${skill.iconX}%`,
          top: `${skill.iconY}%`,
        }"
      >
        <div class="skill-icon-wrapper">
          <i :class="skill.icon"></i>
        </div>
        <span class="skill-label">{{ skill.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-radar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.radar-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.radar-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  padding: 3rem;
}

.radar-svg {
  width: 100%;
  height: 100%;
}

.grid-polygon {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 0.15;
  opacity: 0.5;
}

.grid-outer {
  stroke-width: 0.25;
  opacity: 0.8;
}

.axis-line {
  stroke: var(--color-border);
  stroke-width: 0.1;
  opacity: 0.3;
}

.radar-fill {
  fill: url(#radarGradient);
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.skills-radar:hover .radar-fill {
  opacity: 0.5;
}

.radar-outline {
  fill: none;
  stroke: #06b6d4;
  stroke-width: 0.4;
  filter: drop-shadow(0 0 3px rgba(6, 182, 212, 0.5));
}

.skill-point {
  fill: #06b6d4;
  filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.8));
  transition: r 0.3s ease;
}

.skills-radar:hover .skill-point {
  r: 1.5;
}

.skill-icon-container {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 10;
}

.skill-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.skill-icon-wrapper:hover {
  transform: scale(1.15);
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.skill-icon-wrapper i {
  font-size: 20px;
  color: var(--color-primary);
}

.skill-label {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-align: center;
  white-space: nowrap;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive */
@media (max-width: 768px) {
  .radar-container {
    padding: 2rem;
  }

  .skill-icon-wrapper {
    width: 28px;
    height: 28px;
  }

  .skill-icon-wrapper i {
    font-size: 16px;
  }

  .skill-label {
    font-size: 0.5rem;
    max-width: 50px;
  }
}

@media (max-width: 480px) {
  .radar-container {
    padding: 1.5rem;
  }

  .skill-icon-wrapper {
    width: 24px;
    height: 24px;
  }

  .skill-icon-wrapper i {
    font-size: 14px;
  }

  .skill-label {
    display: none;
  }
}
</style>
