<script setup lang="ts">
import { ref } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
import SocialIcons from "../icons/SocialIcons.vue";

const { isVisible, setTarget } = useScrollReveal();

// Sample projects based on resume experience
const projects = ref(
  [
    {
      title: "Prospera",
      description:
        "A simple and intuitive personal finance app that helps you track multiple income sources, monitor your spending, and build budgets that work for you.",
      technologies: [
        "NestJS",
        "PostgreSQL",
        "Tailwind",
        "Nuxt",
        "Docker",
        "Nginx",
      ],
      image: "/images/prospera.png",
      category: "WEB APP",
      featured: true,
      highlights: [
        "Track income from multiple sources",
        "Log and categorize expenses",
        "Create and manage personal budgets",
      ],
      liveUrl: "https://prospera.michaelquieta.com",
      githubUrl: "https://github.com/mjbquieta/money-tracker",
    },
    {
      title: "Patatas",
      description:
        "A mobile app that manages badminton queues by tracking players and skill levels, creating fair matchups, and rotating players through courts to ensure balanced games and equal playing time.",
      technologies: ["Typescript", "React-Native", "Expo", "Nativewind"],
      image: "/images/badminton-patatas.png",
      category: "Mobile",
      featured: true,
      highlights: [
        "Players - Add players with skill levels (Beginner → Pro), track game counts",
        "Courts - Create/manage multiple courts for singles or doubles play",
        "Smart Queue - Automatically groups players (4 for doubles) with skill-level matching",
        "Real-time stats on players in game, in queue, on bench, and court availability",
      ],
      liveUrl: null,
      githubUrl: "https://github.com/mjbquieta/badminton-mobile-app",
    },
    {
      title: "Timely",
      description:
        "Timely connects to your biometric devices fingerprint scanners, face recognition, and RFID readers to automatically track when employees clock in and out.",
      technologies: [
        "NestJS",
        "PostgreSQL",
        "Tailwind",
        "Nuxt",
        "Docker",
        "Nginx",
      ],
      image: "/images/timely.png",
      category: "WEB APP",
      featured: true,
      highlights: [
        "Secure biometric authentication ensures only the right person clocks in. No more buddy punching.",
        "Just show your face and you're clocked in. Fast, contactless, and incredibly accurate.",
        "Tap your card and go. Simple, reliable, and perfect for high-traffic workplaces.",
        "See who's at work right now. Track patterns, identify issues, and make informed decisions.",
      ],
      liveUrl: "https://timelyph.com",
      githubUrl: "https://github.com/mjbquieta/timely",
    },
  ].map((project) => ({ id: crypto.randomUUID(), ...project })),
);

const hoveredProject = ref<string | null>(null);

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Healthcare: "#10b981",
    "AI/ML": "#8b5cf6",
    Cloud: "#3b82f6",
    Fintech: "#f59e0b",
    DevOps: "#ef4444",
  };
  return colors[category] || "#6366f1";
};
</script>

<template>
  <section
    id="projects"
    class="projects-section"
    :ref="(el) => setTarget(el as HTMLElement)"
  >
    <div class="projects-container" :class="{ visible: isVisible }">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-label">Portfolio</span>
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-description">
          A selection of personal and side projects I've built to explore new
          technologies and solve real-world problems.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card"
          :class="{
            featured: project.featured,
            hovered: hoveredProject === project.id,
          }"
          :style="{
            '--delay': `${index * 0.1}s`,
            '--category-color': getCategoryColor(project.category),
          }"
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
        >
          <!-- Card Header with Category -->
          <div class="card-header">
            <span
              class="project-category"
              :style="{ color: getCategoryColor(project.category) }"
            >
              {{ project.category }}
            </span>
            <div
              class="card-actions"
              v-if="project.liveUrl || project.githubUrl"
            >
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                class="action-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
              >
                <SocialIcons icon="github" :size="18" />
              </a>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                class="action-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
              >
                <SocialIcons icon="external" :size="18" />
              </a>
            </div>
          </div>

          <!-- Project Image/Visual placeholder -->
          <div class="project-visual">
            <!-- Show actual image if available -->
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="project-image"
            />
            <!-- Show placeholder if no image -->
            <div v-else class="visual-placeholder">
              <!-- Animated code-like pattern -->
              <div class="code-lines">
                <div
                  class="code-line"
                  v-for="i in 5"
                  :key="i"
                  :style="{ width: `${40 + Math.random() * 50}%` }"
                ></div>
              </div>

              <!-- Floating elements -->
              <div class="visual-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>

            <!-- Featured badge -->
            <span v-if="project.featured" class="featured-badge">
              Featured
            </span>
          </div>

          <!-- Project Info -->
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>

            <!-- Highlights -->
            <ul class="project-highlights">
              <li v-for="highlight in project.highlights" :key="highlight">
                <span class="highlight-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {{ highlight }}
              </li>
            </ul>

            <!-- Technologies -->
            <div class="project-tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Hover effect border -->
          <div class="card-border-effect"></div>
        </article>
      </div>

      <!-- View More CTA -->
      <!-- <div class="projects-cta">
        <p class="cta-text">
          These are just highlights. I've worked on 50+ projects across multiple
          industries.
        </p>
        <a href="mailto:mjbquieta@gmail.com" class="cta-link">
          Let's discuss your project
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 6rem 1.5rem;
  position: relative;
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.projects-container.visible {
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

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Project Card */
.project-card {
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease backwards;
  animation-delay: var(--delay);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.project-card.featured {
  border-color: var(--category-color);
  border-width: 2px;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem 0;
}

.project-category {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--color-bg-hover);
  border: none;
  border-radius: 10px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--color-primary);
  color: white;
  transform: scale(1.05);
}

/* Project Visual */
.project-visual {
  position: relative;
  height: 180px;
  margin: 1rem 1.5rem;
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-bg-hover);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.visual-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(
    135deg,
    var(--color-bg-hover) 0%,
    rgba(99, 102, 241, 0.05) 100%
  );
}

.code-lines {
  position: absolute;
  top: 20%;
  left: 15%;
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.code-line {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.project-card:hover .code-line {
  background: var(--category-color);
  opacity: 0.3;
}

.visual-icon {
  position: relative;
  z-index: 1;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--category-color);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.project-card:hover .visual-icon {
  transform: scale(1.1);
  opacity: 1;
}

.visual-icon svg {
  width: 100%;
  height: 100%;
}

.featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0.375rem 0.75rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background: var(--color-gradient);
  border-radius: 100px;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

/* Project Info */
.project-info {
  padding: 0 1.5rem 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.project-description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Highlights */
.project-highlights {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-highlights li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.highlight-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--category-color);
}

/* Tech Tags */
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-bg-hover);
  border-radius: 100px;
  transition: all 0.2s ease;
}

.project-card:hover .tech-tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-primary);
}

/* Card Border Effect */
.card-border-effect {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--category-color), transparent 50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-border-effect {
  opacity: 0.1;
}

/* Projects CTA */
.projects-cta {
  text-align: center;
  padding: 3rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 24px;
}

.cta-text {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.cta-link:hover {
  gap: 0.75rem;
}

.cta-link svg {
  transition: transform 0.2s ease;
}

.cta-link:hover svg {
  transform: translateX(4px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .projects-section {
    padding: 4rem 1rem;
  }

  .projects-grid {
    gap: 1.5rem;
  }

  .project-visual {
    height: 150px;
    margin: 0.75rem 1rem;
  }

  .project-info {
    padding: 0 1rem 1rem;
  }

  .projects-cta {
    padding: 2rem 1.5rem;
  }
}
</style>
