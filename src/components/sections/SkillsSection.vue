<script setup lang="ts">
import { ref, computed } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
import SkillsRadar from "../common/SkillsRadar.vue";

const { isVisible, setTarget } = useScrollReveal();

const activeCategory = ref<string>("all");

const categories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "mobile", label: "Mobile" },
  { id: "backend", label: "Backend" },
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI/ML" },
];

// Core skills for radar chart (10-12 works best visually)
// Level is now 0-100 for more precise representation
const radarSkills = [
  { name: "TypeScript", icon: "devicon-typescript-plain", level: 95 },
  { name: "Vue.js", icon: "devicon-vuejs-plain", level: 80 },
  { name: "React", icon: "devicon-react-original", level: 80 },
  { name: "Node.js", icon: "devicon-nodejs-plain", level: 90 },
  { name: "NestJS", icon: "devicon-nestjs-original", level: 90 },
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", level: 90 },
  { name: "Docker", icon: "devicon-docker-plain", level: 85 },
  { name: "Kubernetes", icon: "devicon-kubernetes-plain", level: 60 },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain", level: 85 },
  { name: "Tailwind", icon: "devicon-tailwindcss-original", level: 85 },
];

// All skills with 0-100 levels
const skills = [
  {
    name: "JS/TS",
    icon: "devicon-typescript-plain",
    level: 95,
    category: "frontend",
  },
  {
    name: "Vue.js/Nuxt.js",
    icon: "devicon-vuejs-plain",
    level: 95,
    category: "frontend",
  },
  {
    name: "Next.js/React",
    icon: "devicon-react-original",
    level: 80,
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-original",
    level: 95,
    category: "frontend",
  },
  {
    name: "React Native",
    icon: "devicon-react-original",
    level: 80,
    category: "mobile",
  },
  {
    name: "NativeWind",
    icon: "devicon-tailwindcss-original",
    level: 85,
    category: "mobile",
  },
  {
    name: "NestJS",
    icon: "devicon-nestjs-original",
    level: 90,
    category: "backend",
  },
  {
    name: "Java/Scala",
    icon: "devicon-java-plain",
    level: 75,
    category: "backend",
  },
  {
    name: "Node.js",
    icon: "devicon-nodejs-plain",
    level: 90,
    category: "backend",
  },
  {
    name: "AWS",
    icon: "devicon-amazonwebservices-plain-wordmark",
    level: 85,
    category: "cloud",
  },
  {
    name: "Google Cloud",
    icon: "devicon-googlecloud-plain",
    level: 75,
    category: "cloud",
  },
  {
    name: "Docker",
    icon: "devicon-docker-plain",
    level: 90,
    category: "devops",
  },
  {
    name: "Kubernetes",
    icon: "devicon-kubernetes-plain",
    level: 70,
    category: "devops",
  },
  {
    name: "CI/CD Pipelines",
    icon: "devicon-githubactions-plain",
    level: 90,
    category: "devops",
  },
  {
    name: "Linux",
    icon: "devicon-linux-plain",
    level: 90,
    category: "devops",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain",
    level: 90,
    category: "database",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    level: 80,
    category: "database",
  },
  {
    name: "Supabase",
    icon: "devicon-supabase-plain",
    level: 80,
    category: "database",
  },
  {
    name: "LLM Integration",
    icon: "devicon-tensorflow-original",
    level: 75,
    category: "ai",
  },
  {
    name: "Pinecone DB",
    icon: "devicon-pytorch-original",
    level: 75,
    category: "ai",
  },
  {
    name: "Prompt Engineering",
    icon: "devicon-jupyter-plain",
    level: 80,
    category: "ai",
  },
];

const filteredSkills = computed(() => {
  if (activeCategory.value === "all") return skills;
  return skills.filter((skill) => skill.category === activeCategory.value);
});
</script>

<template>
  <section
    id="skills"
    class="skills-section"
    :ref="(el) => setTarget(el as HTMLElement)"
  >
    <div class="skills-container" :class="{ visible: isVisible }">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-label">What I Work With</span>
        <h2 class="section-title">Skills & Technologies</h2>
        <p class="section-description">
          11+ years of experience with a diverse tech stack, from frontend
          frameworks to cloud infrastructure.
        </p>
      </div>

      <!-- Radar Chart -->
      <div class="radar-section">
        <SkillsRadar :skills="radarSkills" title="Core Technologies" />
      </div>

      <!-- Section Separator -->
      <div class="section-separator">
        <span class="separator-line"></span>
        <span class="separator-text">All Skills</span>
        <span class="separator-line"></span>
      </div>

      <!-- Category Filter -->
      <div class="category-filter">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="filter-btn"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Skills Grid -->
      <div class="skills-grid">
        <TransitionGroup name="skill">
          <div
            v-for="(skill, index) in filteredSkills"
            :key="skill.name"
            class="skill-card"
            :style="{ '--delay': `${index * 0.03}s` }"
          >
            <div class="skill-icon-wrapper">
              <i :class="skill.icon"></i>
            </div>
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-level-bar">
              <div
                class="skill-level-fill"
                :style="{ width: `${skill.level}%` }"
              ></div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Experience highlights -->
      <!-- <div class="experience-highlights">
        <div class="highlight-card">
          <span class="highlight-number">11+</span>
          <span class="highlight-label">Years Experience</span>
        </div>
        <div class="highlight-card">
          <span class="highlight-number">50+</span>
          <span class="highlight-label">Projects Delivered</span>
        </div>
        <div class="highlight-card">
          <span class="highlight-number">4</span>
          <span class="highlight-label">Industries Served</span>
        </div>
        <div class="highlight-card">
          <span class="highlight-number">100%</span>
          <span class="highlight-label">Client Satisfaction</span>
        </div>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 6rem 1.5rem;
  position: relative;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.skills-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Radar Section */
.radar-section {
  margin-bottom: 3rem;
}

/* Section Separator */
.section-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.separator-line {
  flex: 1;
  max-width: 150px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-border),
    var(--color-primary),
    var(--color-border),
    transparent
  );
}

.separator-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Category Filter */
.category-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
}

.filter-btn.active {
  color: white;
  background: var(--color-gradient);
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 4rem;
}

.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem 1rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease backwards;
  animation-delay: var(--delay);
  text-align: center;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.skill-card:hover .skill-icon-wrapper {
  transform: scale(1.1);
}

.skill-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-bg-hover);
  border-radius: 12px;
  color: var(--color-primary);
  transition: transform 0.3s ease;
}

.skill-icon-wrapper i {
  font-size: 28px;
  color: var(--color-primary);
}

.skill-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

/* Skill Level Bar */
.skill-level-bar {
  width: 100%;
  height: 4px;
  background: var(--color-bg-hover);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.25rem;
}

.skill-level-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #06b6d4);
  border-radius: 2px;
  transition: width 0.6s ease-out;
}

.skill-card:hover .skill-level-fill {
  filter: brightness(1.1);
}

/* Transition animations */
.skill-enter-active {
  transition: all 0.4s ease;
}

.skill-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.skill-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.skill-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Experience Highlights */
.experience-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.highlight-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.highlight-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  background: var(--color-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.highlight-label {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .skills-section {
    padding: 4rem 1rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .skill-card {
    padding: 1rem 0.75rem;
  }

  .skill-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .skill-icon-wrapper i {
    font-size: 24px;
  }

  .skill-name {
    font-size: 0.75rem;
  }

  .skill-level-bar {
    height: 3px;
  }

  .category-filter {
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }

  .filter-btn {
    white-space: nowrap;
  }
}
</style>
