import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Données de seed pour les compétences
const skillsData = [
  // Frontend
  { name: 'React', description: 'Bibliothèque JavaScript pour construire des interfaces utilisateur', category: 'Frontend', color: '#61DAFB', icon: '⚛️' },
  { name: 'Vue.js', description: 'Framework JavaScript progressif', category: 'Frontend', color: '#4FC08D', icon: '🟢' },
  { name: 'Angular', description: 'Framework web développé par Google', category: 'Frontend', color: '#DD0031', icon: '🅰️' },
  { name: 'TypeScript', description: 'Superset typé de JavaScript', category: 'Frontend', color: '#3178C6', icon: '📘' },
  { name: 'Tailwind CSS', description: 'Framework CSS utility-first', category: 'Frontend', color: '#06B6D4', icon: '🎨' },
  { name: 'Sass/SCSS', description: 'Préprocesseur CSS', category: 'Frontend', color: '#CF649A', icon: '💄' },
  
  // Backend
  { name: 'Node.js', description: 'Runtime JavaScript côté serveur', category: 'Backend', color: '#339933', icon: '🟢' },
  { name: 'Python', description: 'Langage de programmation polyvalent', category: 'Backend', color: '#3776AB', icon: '🐍' },
  { name: 'Java', description: 'Langage de programmation orienté objet', category: 'Backend', color: '#ED8B00', icon: '☕' },
  { name: 'PHP', description: 'Langage de script côté serveur', category: 'Backend', color: '#777BB4', icon: '🐘' },
  { name: 'C#', description: 'Langage développé par Microsoft', category: 'Backend', color: '#239120', icon: '🔷' },
  { name: 'Go', description: 'Langage développé par Google', category: 'Backend', color: '#00ADD8', icon: '🐹' },
  { name: 'Rust', description: 'Langage de programmation système', category: 'Backend', color: '#000000', icon: '🦀' },
  
  // Base de données
  { name: 'PostgreSQL', description: 'Système de gestion de base de données relationnel', category: 'Database', color: '#336791', icon: '🐘' },
  { name: 'MongoDB', description: 'Base de données NoSQL orientée document', category: 'Database', color: '#47A248', icon: '🍃' },
  { name: 'MySQL', description: 'Système de gestion de base de données relationnel', category: 'Database', color: '#4479A1', icon: '🐬' },
  { name: 'Redis', description: 'Base de données en mémoire', category: 'Database', color: '#DC382D', icon: '⚡' },
  { name: 'SQLite', description: 'Moteur de base de données léger', category: 'Database', color: '#003B57', icon: '📦' },
  
  // DevOps
  { name: 'Docker', description: 'Plateforme de conteneurisation', category: 'DevOps', color: '#2496ED', icon: '🐳' },
  { name: 'Kubernetes', description: 'Orchestrateur de conteneurs', category: 'DevOps', color: '#326CE5', icon: '☸️' },
  { name: 'AWS', description: 'Services cloud Amazon', category: 'DevOps', color: '#FF9900', icon: '☁️' },
  { name: 'GitHub Actions', description: 'Plateforme CI/CD de GitHub', category: 'DevOps', color: '#2088FF', icon: '🔄' },
  { name: 'Terraform', description: 'Outil d\'infrastructure as code', category: 'DevOps', color: '#623CE4', icon: '🏗️' },
  
  // Mobile
  { name: 'React Native', description: 'Framework pour applications mobiles', category: 'Mobile', color: '#61DAFB', icon: '📱' },
  { name: 'Flutter', description: 'SDK de développement mobile Google', category: 'Mobile', color: '#02569B', icon: '🐦' },
  { name: 'Swift', description: 'Langage pour développement iOS', category: 'Mobile', color: '#FA7343', icon: '🍎' },
  { name: 'Kotlin', description: 'Langage pour développement Android', category: 'Mobile', color: '#7F52FF', icon: '🤖' },
  
  // Outils
  { name: 'Git', description: 'Système de contrôle de version', category: 'Tools', color: '#F05032', icon: '📝' },
  { name: 'Figma', description: 'Outil de design collaboratif', category: 'Tools', color: '#F24E1E', icon: '🎨' },
  { name: 'Postman', description: 'Plateforme de test d\'API', category: 'Tools', color: '#FF6C37', icon: '📮' },
  { name: 'Jest', description: 'Framework de test JavaScript', category: 'Tools', color: '#C21325', icon: '🧪' }
]

// Données de seed pour les projets
const projectsData = [
  {
    title: 'TaskFlow - Gestionnaire de Tâches',
    description: 'Une application complète de gestion de tâches avec interface moderne, collaboration en temps réel et système de notifications. Parfait pour apprendre React, Node.js et les WebSockets.',
    shortDesc: 'App de gestion de tâches collaborative',
    status: 'OPEN',
    difficulty: 'INTERMEDIATE',
    maxMembers: 4,
    isPublic: true,
    tags: ['Productivité', 'Collaboration', 'Temps réel'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript']
  },
  {
    title: 'EcoTracker - Suivi Écologique',
    description: 'Application mobile pour suivre son empreinte carbone quotidienne avec gamification et conseils personnalisés. Intègre des APIs externes et utilise des charts interactifs.',
    shortDesc: 'App mobile d\'impact écologique',
    status: 'IN_PROGRESS',
    difficulty: 'ADVANCED',
    maxMembers: 6,
    isPublic: true,
    tags: ['Écologie', 'Mobile', 'Gamification'],
    technologies: ['React Native', 'Python', 'MongoDB', 'Docker']
  },
  {
    title: 'DevMentor - Plateforme de Mentorat',
    description: 'Plateforme connectant développeurs juniors et seniors pour du mentorat. Système de matching, planning de sessions et suivi de progression.',
    shortDesc: 'Plateforme de mentorat tech',
    status: 'PLANNING',
    difficulty: 'ADVANCED',
    maxMembers: 5,
    isPublic: true,
    tags: ['Éducation', 'Mentorat', 'Communauté'],
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Redis']
  },
  {
    title: 'LocalMarket - E-commerce Local',
    description: 'Marketplace pour commerces locaux avec géolocalisation, système de commandes et livraisons. Interface admin complète et app mobile pour les livreurs.',
    shortDesc: 'E-commerce pour commerces locaux',
    status: 'OPEN',
    difficulty: 'ADVANCED',
    maxMembers: 8,
    isPublic: true,
    tags: ['E-commerce', 'Local', 'Géolocalisation'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    title: 'StudyBuddy - Assistant d\'Étude',
    description: 'Application d\'aide aux études avec techniques de mémorisation, quiz personnalisés et suivi de progression. Interface simple et efficace.',
    shortDesc: 'Assistant personnel d\'étude',
    status: 'IN_PROGRESS',
    difficulty: 'BEGINNER',
    maxMembers: 3,
    isPublic: true,
    tags: ['Éducation', 'Mémorisation', 'Quiz'],
    technologies: ['React', 'TypeScript', 'SQLite']
  },
  {
    title: 'FitTracker - Suivi Fitness',
    description: 'App de suivi d\'entraînements avec programmes personnalisés, statistiques détaillées et communauté. Intégration avec wearables.',
    shortDesc: 'Application de suivi fitness',
    status: 'COMPLETED',
    difficulty: 'INTERMEDIATE',
    maxMembers: 4,
    isPublic: true,
    tags: ['Fitness', 'Santé', 'Communauté'],
    technologies: ['Flutter', 'Go', 'PostgreSQL', 'Redis']
  },
  {
    title: 'CodeReview Tool',
    description: 'Outil de revue de code avec analyse automatique, suggestions d\'amélioration et intégration Git. Dashboard pour équipes de développement.',
    shortDesc: 'Outil de revue de code avancé',
    status: 'OPEN',
    difficulty: 'ADVANCED',
    maxMembers: 6,
    isPublic: true,
    tags: ['Développement', 'Code Quality', 'Git'],
    technologies: ['TypeScript', 'Python', 'MongoDB', 'Docker', 'Git']
  },
  {
    title: 'WeatherApp - Météo Moderne',
    description: 'Application météo avec design moderne, prévisions détaillées et alertes personnalisées. Parfait projet pour débuter.',
    shortDesc: 'App météo avec design moderne',
    status: 'PLANNING',
    difficulty: 'BEGINNER',
    maxMembers: 2,
    isPublic: true,
    tags: ['Météo', 'API', 'Design'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'CryptoPortfolio - Tracker Crypto',
    description: 'Tracker de portfolio crypto avec graphiques en temps réel, alertes de prix et analyse technique. Intégration avec plusieurs exchanges.',
    shortDesc: 'Gestionnaire de portfolio crypto',
    status: 'IN_PROGRESS',
    difficulty: 'INTERMEDIATE',
    maxMembers: 4,
    isPublic: true,
    tags: ['Crypto', 'Finance', 'Trading'],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets']
  },
  {
    title: 'BlogCMS - Système de Blog',
    description: 'CMS moderne pour blogs avec éditeur WYSIWYG, gestion des médias, SEO et thèmes personnalisables. Interface admin intuitive.',
    shortDesc: 'CMS moderne pour blogs',
    status: 'OPEN',
    difficulty: 'INTERMEDIATE',
    maxMembers: 5,
    isPublic: true,
    tags: ['CMS', 'Blog', 'SEO'],
    technologies: ['Vue.js', 'PHP', 'MySQL', 'Docker']
  }
]

async function main() {
  console.log('🌱 Début du seed...')

  // Créer les compétences
  console.log('📚 Création des compétences...')
  const createdSkills = []
  
  for (const skillData of skillsData) {
    const skill = await prisma.skill.upsert({
      where: { name: skillData.name },
      update: {},
      create: skillData
    })
    createdSkills.push(skill)
    console.log(`✅ Compétence créée: ${skill.name}`)
  }

  // Créer un utilisateur de test pour être le créateur des projets
  console.log('👤 Création de l\'utilisateur de test...')
  const testUser = await prisma.user.upsert({
    where: { email: 'admin@skillcraft.dev' },
    update: {},
    create: {
      email: 'admin@skillcraft.dev',
      username: 'admin_skillcraft',
      firstName: 'Admin',
      lastName: 'SkillCraft',
      name: 'Admin SkillCraft',
      isAdmin: true,
      bio: 'Compte administrateur pour la gestion de la plateforme SkillCraft'
    }
  })
  console.log(`✅ Utilisateur créé: ${testUser.username}`)

  // Créer les projets
  console.log('🚀 Création des projets...')
  
  for (const projectData of projectsData) {
    // Extraire les technologies du projet
    const { technologies, ...projectInfo } = projectData
    
    const project = await prisma.project.create({
      data: {
        ...projectInfo,
        creatorId: testUser.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // +3 mois
      }
    })
    
    // Associer les technologies au projet
    for (const techName of technologies) {
      const skill = createdSkills.find(s => s.name === techName)
      if (skill) {
        await prisma.projectTechnology.create({
          data: {
            projectId: project.id,
            skillId: skill.id
          }
        })
      }
    }
    
    console.log(`✅ Projet créé: ${project.title}`)
  }

  console.log('🎉 Seed terminé avec succès !')
  console.log(`📊 Statistiques:`)
  console.log(`   - ${createdSkills.length} compétences créées`)
  console.log(`   - ${projectsData.length} projets créés`)
  console.log(`   - 1 utilisateur administrateur créé`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erreur lors du seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })