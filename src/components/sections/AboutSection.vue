<script setup lang="ts">
import { useScrollReveal } from "../../composables/useScrollReveal";

const { isVisible, setTarget } = useScrollReveal();

const timeline = [
  {
    period: "2023 - Present",
    role: "Full Stack Developer / DevSecOps",
    company: "HealthcareGPS Inc.",
    description:
      "Building AI-powered healthcare platforms integrating LLMs and vector databases (Pinecone) for intelligent health plan recommendations. Implementing RAG pipelines, prompt engineering, and ensuring HIPAA-compliant AI solutions with NestJS and PostgreSQL.",
  },
  {
    period: "2023 - 2024",
    role: "Full Stack Developer / AWS Cloud Engineer",
    company: "YourWayHome LLC",
    description:
      "Architected cloud solutions on AWS, implemented CI/CD pipelines, and migrated legacy applications with zero downtime.",
  },
  {
    period: "2016 - 2023",
    role: "Software Engineer / Senior DevOps",
    company: "Vauldex Technologies Inc.",
    description:
      "Led full-stack development using Scala, Java, VueJS, and implemented serverless architecture across AWS and GCP.",
  },
  {
    period: "2014 - 2016",
    role: "PHP Developer",
    company: "IXBASE",
    description:
      "Developed accounting and payroll solutions for cooperative banking with secure RESTful API integrations.",
  },
];
</script>

<template>
  <section
    id="about"
    class="about-section"
    :ref="(el) => setTarget(el as HTMLElement)"
  >
    <div class="about-container" :class="{ visible: isVisible }">
      <div class="about-grid">
        <!-- About Content -->
        <div class="about-content">
          <span class="section-label">About Me</span>
          <h2 class="section-title">
            Passionate About Building Smart Solutions
          </h2>

          <div class="about-text">
            <p>
              I'm Michael John, a senior full-stack software engineer based in
              <strong>Cebu City, Philippines</strong>. With over
              <strong>11 years</strong> of experience, I've had the opportunity
              to build systems that matter - from healthcare platforms that help
              people find the right coverage, to banking solutions that handle
              sensitive transactions securely.
            </p>

            <p>
              My journey started with PHP and has evolved through Java, Scala,
              and now modern TypeScript/JavaScript ecosystems. I also build
              cross-platform mobile applications using
              <strong>React Native</strong>. I believe in writing code that's
              not just functional, but maintainable, secure, and scalable.
            </p>

            <p>
              Currently, I'm deeply involved in implementing
              <strong>AI and LLM solutions</strong>
              for healthcare applications - building RAG pipelines, working with
              vector databases, and creating intelligent systems that help
              people navigate complex health decisions. I'm passionate about
              DevSecOps practices, cloud technologies, and building systems that
              developers love to work with.
            </p>
          </div>

          <!-- Personal traits/values -->
          <div class="about-traits">
            <div class="trait">
              <span class="trait-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <div class="trait-info">
                <strong>Quality-Focused</strong>
                <span>Clean code, thorough testing</span>
              </div>
            </div>
            <div class="trait">
              <span class="trait-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <div class="trait-info">
                <strong>Security-Minded</strong>
                <span>DevSecOps advocate</span>
              </div>
            </div>
            <div class="trait">
              <span class="trait-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  />
                </svg>
              </span>
              <div class="trait-info">
                <strong>Cloud-Native</strong>
                <span>AWS & GCP expert</span>
              </div>
            </div>
            <div class="trait">
              <span class="trait-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </span>
              <div class="trait-info">
                <strong>Mobile Developer</strong>
                <span>React Native apps</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Separator (visible on mobile) -->
        <div class="section-separator mobile-only">
          <span class="separator-line"></span>
        </div>

        <!-- Experience Timeline -->
        <div class="about-timeline">
          <h3 class="timeline-title">Experience Journey</h3>

          <div class="timeline">
            <div
              v-for="(item, index) in timeline"
              :key="index"
              class="timeline-item"
              :style="{ '--delay': `${index * 0.15}s` }"
            >
              <div class="timeline-marker">
                <span class="marker-dot"></span>
                <span
                  class="marker-line"
                  v-if="index < timeline.length - 1"
                ></span>
              </div>

              <div class="timeline-content">
                <span class="timeline-period">{{ item.period }}</span>
                <h4 class="timeline-role">{{ item.role }}</h4>
                <span class="timeline-company">{{ item.company }}</span>
                <p class="timeline-description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Separator -->
      <div class="section-separator full-width">
        <span class="separator-line"></span>
      </div>

      <!-- Education -->
      <!-- <div class="education-section">
        <h3 class="education-title">Education</h3>
        <div class="education-card">
          <div class="education-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div class="education-info">
            <h4>Bachelor of Science in Information Technology</h4>
            <span class="education-school">University of Cebu</span>
            <span class="education-year">2009 - 2014</span>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 6rem 1.5rem;
  position: relative;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.about-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* Section Separator */
.section-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.separator-line {
  display: block;
  width: 100%;
  max-width: 200px;
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

.mobile-only {
  display: none;
}

@media (max-width: 900px) {
  .mobile-only {
    display: flex;
  }
}

.full-width {
  grid-column: 1 / -1;
}

.full-width .separator-line {
  max-width: 400px;
}

/* Section Label & Title */
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
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

/* About Text */
.about-text {
  margin-bottom: 2rem;
}

.about-text p {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.about-text p:last-child {
  margin-bottom: 0;
}

.about-text strong {
  color: var(--color-text);
  font-weight: 600;
}

/* Traits */
.about-traits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trait {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.trait:hover {
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.trait-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-bg-hover);
  border-radius: 12px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.trait-icon svg {
  width: 22px;
  height: 22px;
}

.trait-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.trait-info strong {
  font-size: 0.9375rem;
  color: var(--color-text);
}

.trait-info span {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* Timeline */
.about-timeline {
  position: relative;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
  padding-bottom: 2rem;
  animation: fadeInUp 0.5s ease backwards;
  animation-delay: var(--delay);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 14px;
  height: 14px;
  background: var(--color-gradient);
  border-radius: 50%;
  box-shadow:
    0 0 0 4px var(--color-bg),
    0 0 0 6px var(--color-primary);
}

.marker-line {
  width: 2px;
  flex-grow: 1;
  background: var(--color-border);
  margin-top: 0.5rem;
}

.timeline-content {
  padding-bottom: 0.5rem;
}

.timeline-period {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.timeline-role {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.timeline-company {
  display: block;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.timeline-description {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* Education */
.education-section {
  text-align: center;
}

.education-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.education-card {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  text-align: left;
  transition: all 0.3s ease;
}

.education-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
}

.education-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-bg-hover);
  border-radius: 14px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.education-icon svg {
  width: 28px;
  height: 28px;
}

.education-info {
  display: flex;
  flex-direction: column;
}

.education-info h4 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.education-school {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.education-year {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
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
  .about-section {
    padding: 4rem 1rem;
  }

  .education-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
}
</style>
