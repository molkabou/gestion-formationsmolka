# **Documentation du Projet : Gestion de Formation**

## **Introduction**
Ce projet vise à déployer une application de gestion de formation professionnelle. L’application comprend des services backend (Node.js) et une base de données MySQL. Le projet met à profit des outils modernes comme Docker, Kubernetes, Helm, et ArgoCD pour assurer un déploiement automatisé et scalable. En outre, Prometheus et Grafana sont intégrés pour le monitoring des performances.

## **Pré-requis**

### Logiciels nécessaires
1. **Docker** : Pour la conteneurisation des services.
2. **Kubernetes** : Pour orchestrer les conteneurs.
3. **Helm** : Pour la gestion des déploiements Kubernetes.
4. **ArgoCD** : Pour mettre en place une stratégie GitOps.
5. **Prometheus** : Pour collecter les métriques de l’application.
6. **Grafana** : Pour visualiser les métriques via des tableaux de bord personnalisés.

### Environnement
- Système d’exploitation : Windows, Linux ou macOS
- Accès à Internet pour télécharger les images Docker et les dépendances.
- Un cluster Kubernetes fonctionnel (par ex. Minikube, Kind, ou k3s).

## **Instructions de déploiement**

### **Déploiement avec Docker Compose**
1. Clonez le dépôt Git :
   ```bash
   git clone https://github.com/molkabou/gestion-formationsmolka.git
   cd gestion-formation
   ```
2. Construisez les images Docker :
   ```bash
   docker-compose build
   ```
3. Lancez les services :
   ```bash
   docker-compose up
   ```
4. Accédez à l'application via : `http://localhost:5000`.

### **Déploiement sur Kubernetes avec Helm et ArgoCD**

#### **Avec Helm**
1. Ajoutez les dépôts Helm requis :
   ```bash
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   ```
2. Déployez l’application :
   ```bash
   helm install gestion-formation helm/gestion-formation --namespace default
   ```
3. Assurez-vous que les pods sont actifs :
   ```bash
   kubectl get pods
   ```
4. Accédez à l'application via l'adresse IP du service exposé :
   ```bash
   kubectl get svc gestion-formation-service
   ```

#### **Avec ArgoCD**
1. Créez une application ArgoCD :
   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: gestion-formation
   spec:
     project: default
     source:
       repoURL: 'https://github.com/molkabou'
       targetRevision: HEAD
       path: helm/gestion-formation
     destination:
       server: 'https://kubernetes.default.svc'
       namespace: default
     syncPolicy:
       automated:
         prune: true
         selfHeal: true
   ```
2. Appliquez le fichier YAML :
   ```bash
   kubectl apply -f argocd/argocd-application.yaml
   ```
3. Accédez à l’interface ArgoCD pour surveiller le déploiement.

### **Monitoring avec Prometheus et Grafana**
1. Installez Prometheus :
   ```bash
   helm install prometheus prometheus-community/prometheus --namespace monitoring
   ```
2. Installez Grafana :
   ```bash
   helm install grafana prometheus-community/grafana --namespace monitoring
   ```
3. Configurez Prometheus comme source de données dans Grafana :
   - URL : `http://prometheus-server.monitoring.svc.cluster.local`
   - Testez et sauvegardez.
4. Importez un tableau de bord JSON depuis [Grafana Dashboards](https://grafana.com/grafana/dashboards).

## **Utilisation**
- Accédez à l'application via l'adresse IP ou le nom de domaine configuré.
- Consultez les tableaux de bord Grafana pour les métriques sur l’application et le cluster Kubernetes.



## **Conclusion**
Ce projet fournit une solution complète pour déployer, surveiller et utiliser une application de gestion de formation. En suivant ces instructions, vous pouvez configurer un environnement fonctionnel et scalable.

