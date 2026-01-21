<script setup lang="ts">
import { ref, computed } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
import SkillIcons from "../icons/SkillIcons.vue";

const { isVisible, setTarget } = useScrollReveal();

const activeCategory = ref<string>("all");

const categories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI/ML" },
];

const skills = [
  {
    name: "JavaScript/TypeScript",
    icon: "typescript",
    level: 5,
    category: "frontend",
  },
  { name: "Vue.js/Nuxt.js", icon: "vue", level: 5, category: "frontend" },
  { name: "Next.js/React", icon: "vue", level: 4, category: "frontend" },
  { name: "NestJS", icon: "nestjs", level: 5, category: "backend" },
  { name: "Java/Scala", icon: "java", level: 4, category: "backend" },
  { name: "Node.js", icon: "typescript", level: 5, category: "backend" },
  { name: "AWS", icon: "aws", level: 5, category: "cloud" },
  { name: "Google Cloud", icon: "gcp", level: 4, category: "cloud" },
  { name: "Docker", icon: "docker", level: 5, category: "devops" },
  { name: "Kubernetes", icon: "kubernetes", level: 4, category: "devops" },
  { name: "CI/CD Pipelines", icon: "devops", level: 5, category: "devops" },
  { name: "Linux", icon: "linux", level: 5, category: "devops" },
  { name: "PostgreSQL", icon: "database", level: 5, category: "database" },
  { name: "MongoDB", icon: "database", level: 4, category: "database" },
  { name: "Supabase", icon: "database", level: 4, category: "database" },
  { name: "AI/LLM Integration", icon: "ai", level: 4, category: "ai" },
  { name: "Pinecone DB", icon: "ai", level: 4, category: "ai" },
  { name: "Prompt Engineering", icon: "ai", level: 4, category: "ai" },
];

const filteredSkills = computed(() => {
  if (activeCategory.value === "all") return skills;
  return skills.filter((skill) => skill.category === activeCategory.value);
});

const getLevelLabel = (level: number): string => {
  const labels = ["", "Basic", "Intermediate", "Advanced", "Expert", "Master"];
  return labels[level] || "";
};
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
            :style="{ '--delay': `${index * 0.05}s` }"
          >
            <div class="skill-icon-wrapper">
              <SkillIcons :icon="skill.icon" :size="48" />
            </div>

            <div class="skill-info">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <span class="skill-level">{{ getLevelLabel(skill.level) }}</span>
            </div>

            <!-- Skill level indicator -->
            <div class="skill-meter">
              <div
                class="skill-meter-fill"
                :style="{ width: `${skill.level * 20}%` }"
              >
                <div class="meter-glow"></div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div class="card-decoration">
              <span class="decoration-dot"></span>
              <span class="decoration-dot"></span>
              <span class="decoration-dot"></span>
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.skill-card {
  position: relative;
  padding: 1.5rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease backwards;
  animation-delay: var(--delay);
  overflow: hidden;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.skill-card:hover .skill-icon-wrapper {
  transform: scale(1.1) rotate(-5deg);
}

.skill-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 1rem;
  background: var(--color-bg-hover);
  border-radius: 16px;
  color: var(--color-primary);
  transition: transform 0.3s ease;
}

.skill-info {
  margin-bottom: 1rem;
}

.skill-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.skill-level {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Skill Meter */
.skill-meter {
  height: 6px;
  background: var(--color-bg-hover);
  border-radius: 10px;
  overflow: hidden;
}

.skill-meter-fill {
  height: 100%;
  background: var(--color-gradient);
  border-radius: 10px;
  position: relative;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.meter-glow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0.6;
}

/* Card Decoration */
.card-decoration {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 4px;
  opacity: 0.3;
}

.decoration-dot {
  width: 6px;
  height: 6px;
  background: var(--color-text);
  border-radius: 50%;
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
    grid-template-columns: 1fr;
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
