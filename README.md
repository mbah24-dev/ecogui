<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<body>

  <h1 align="center">🛒 Ecogui - Plateforme E-commerce pour la Guinée 🇬🇳</h1>

  <p align="center"><strong>Ecogui</strong> est une solution e-commerce moderne et sécurisée, conçue pour connecter vendeurs et acheteurs guinéens sur une plateforme intuitive et fiable. Propulsée par NestJS, Angular, Prisma et PostgreSQL (via Supabase).</p>

  <h2>🚀 Fonctionnalités Clés</h2>
  <ul>
    <li>Gestion des rôles : Acheteur, Vendeur, Admin</li>
    <li>Ajout et gestion de produits</li>
    <li>Suivi complet des commandes</li>
    <li>Panier d'achat en temps réel</li>
    <li>Système de notation vendeur</li>
    <li>Facturation et historique de transactions</li>
    <li>Authentification sécurisée avec 2FA</li>
    <li>Score vendeur avec bannissement automatique</li>
  </ul>

  <h2>🧑‍💼 Rôles et Parcours Utilisateurs</h2>

  <h3>Acheteur</h3>
  <ul>
    <li>Recherche et filtrage de produits</li>
    <li>Ajout au panier, paiement et suivi</li>
    <li>Évaluation des vendeurs</li>
  </ul>

  <h3>Vendeur</h3>
  <ul>
    <li>Ajout de produits avec image, prix, stock</li>
    <li>Réception de commandes en temps réel</li>
    <li>Gestion de ses ventes et notifications</li>
    <li>Score calculé en fonction des performances</li>
    <li>Bannissement si score = 0</li>
  </ul>

  <h3>Admin</h3>
  <ul>
    <li>Dashboard de gestion globale</li>
    <li>Validation et suspension des comptes</li>
    <li>Analyse des scores et interventions</li>
  </ul>

  <h2>🛠️ Technologies Utilisées</h2>
  <ul>
    <li><strong>NestJS</strong> - Backend scalable</li>
    <li><strong>Angular</strong> - Frontend dynamique</li>
    <li><strong>Prisma</strong> - ORM performant</li>
    <li><strong>PostgreSQL</strong> - Base de données relationnelle</li>
    <li><strong>Supabase</strong> - Auth & DB as a service</li>
    <li><strong>SCSS + Material Design</strong> - UI responsive</li>
  </ul>

  <h2>📦 Structure du Projet</h2>
  <pre>
ecogui/
├── backend/     # API NestJS
│   ├── src/
│   │   └── modules/
├── frontend/    # App Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── buyer/
│   │   │   ├── seller/
│   │   │   ├── admin/
│   │   │   └── shared/
  </pre>

  <h2>📈 Score des Vendeurs</h2>
  <table border="1">
    <thead>
      <tr>
        <th>Score</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>5</td><td>⭐⭐⭐⭐⭐ Excellent</td></tr>
      <tr><td>3-4</td><td>👍 Acceptable</td></tr>
      <tr><td>1-2</td><td>⚠️ À surveiller</td></tr>
      <tr><td>0</td><td>❌ Banni automatiquement</td></tr>
    </tbody>
  </table>

  <h2>🧪 Exemple de Code TypeScript</h2>
  <pre>
addToCart(productId: string, quantity: number) {
  this.cartService.add(productId, quantity);
}
  </pre>

  <h2>🔐 Sécurité</h2>
  <ul>
    <li>JWT & Auth à 2 facteurs</li>
    <li>Hashage Bcrypt</li>
    <li>Rôles strictement contrôlés</li>
    <li>Logs et alertes de sécurité</li>
  </ul>

  <h2>💻 Lancer le projet en local</h2>
  <pre>
# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd frontend
npm install
ng serve
  </pre>

  <h2>🔗 Liens Utiles</h2>
  <ul>
    <li><a href="#">🌐 Accéder à Ecogui</a></li>
    <li><a href="#">📄 Documentation API</a></li>
    <li><a href="#">🐙 Repository GitHub</a></li>
  </ul>

  <h2>📬 Contact</h2>
  <ul>
    <li>Email : <a href="mailto:hello@ecogui.com">hello@ecogui.com</a></li>
    <li>WhatsApp : +224 628 XX XX XX</li>
  </ul>

  <p align="center">Développé avec ❤️ pour les entrepreneurs guinéens 🇬🇳</p>


</body>

