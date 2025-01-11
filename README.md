# Documentation Détaillée : Instructions de Déploiement, Configuration et Utilisation

## 1. Aperçu du Projet
Ce projet consiste à déployer une application de gestion des formations avec des outils d’observabilité et de monitoring utilisant Prometheus et Grafana sur Kubernetes (via Minikube).

L'objectif est de garantir un suivi efficace des métriques de l'application et du cluster.

---

## 2. Prérequis

Avant de commencer, assurez-vous d'avoir :

1. **Outils d’installation** :
   - Docker
   - Minikube
   - Kubectl
   - Helm
   - Curl
2. **Un cluster Kubernetes fonctionnel** :
   - Minikube ou tout autre cluster local.
3. **Accès à Docker Hub** :
   - Vous devez disposer d'un compte Docker Hub pour pousser et tirer des images Docker.
4. **Droits Administrateurs** :
   - Pour exécuter les commandes requises sur votre système.

---

## 3. Instructions de Déploiement

### 3.1 Configuration de Minikube

1. **Démarrez Minikube :**
   ```bash
   minikube start
   ```

2. **Vérifiez que le cluster est actif :**
   ```bash
   kubectl get nodes
   ```

3. **Activer les addons utiles :**
   ```bash
   minikube addons enable ingress
   minikube addons enable metrics-server
   ```

### 3.2 Construction et Poussée de l'Image Docker

1. **Construisez l’image Docker de l’application :**
   ```bash
   docker build -t <votre-utilisateur-docker>/gestion-formation:latest .
   ```

2. **Connectez-vous à Docker Hub :**
   ```bash
   docker login
   ```

3. **Poussez l’image dans Docker Hub :**
   ```bash
   docker push <votre-utilisateur-docker>/gestion-formation:latest
   ```

### 3.3 Création des Manifestes Kubernetes

1. **Fichier `deployment.yaml` :**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: gestion-formation
     labels:
       app: gestion-formation
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: gestion-formation
     template:
       metadata:
         labels:
           app: gestion-formation
       spec:
         containers:
         - name: gestion-formation
           image: <votre-utilisateur-docker>/gestion-formation:latest
           ports:
           - containerPort: 5000
           env:
           - name: DB_HOST
             value: mysql
           - name: DB_USER
             value: root
           - name: DB_PASSWORD
             value: root
   ```

2. **Fichier `service.yaml` :**
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: gestion-formation-service
   spec:
     selector:
       app: gestion-formation
     ports:
     - protocol: TCP
       port: 80
       targetPort: 5000
     type: NodePort
   ```

3. **Appliquez les manifestes :**
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

4. **Vérifiez que les pods sont en cours d'exécution :**
   ```bash
   kubectl get pods
   ```

### 3.4 Configuration de Prometheus et Grafana

#### a) Installation de Prometheus

1. **Ajoutez le dépôt Helm de Prometheus :**
   ```bash
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   ```

2. **Installez Prometheus dans le namespace `monitoring` :**
   ```bash
   kubectl create namespace monitoring
   helm install prometheus prometheus-community/prometheus --namespace monitoring
   ```

3. **Exposez Prometheus en local :**
   ```bash
   kubectl port-forward svc/prometheus-server -n monitoring 9090:80
   ```

#### b) Installation de Grafana

1. **Ajoutez le dépôt Helm de Grafana :**
   ```bash
   helm repo add grafana https://grafana.github.io/helm-charts
   helm repo update
   ```

2. **Installez Grafana dans le namespace `monitoring` :**
   ```bash
   helm install grafana grafana/grafana --namespace monitoring
   ```

3. **Exposez Grafana en local :**
   ```bash
   kubectl port-forward svc/grafana -n monitoring 3000:80
   ```

4. **Connectez-vous à Grafana :**
   - URL : [http://localhost:3000](http://localhost:3000)
   - Identifiants par défaut :
     - Nom d’utilisateur : `admin`
     - Mot de passe : `prom-operator` (ou générez-le en consultant le secret Kubernetes).

5. **Ajoutez Prometheus comme source de données :**
   - Allez dans **Configuration > Data Sources**.
   - Cliquez sur **Add Data Source** et choisissez **Prometheus**.
   - URL : `http://prometheus-server.monitoring.svc.cluster.local`.
   - Sauvegardez et testez la connexion.

#### c) Importation des Dashboards Grafana

1. **Téléchargez un dashboard préfait :**
   - Allez sur le site officiel des dashboards Grafana : [https://grafana.com/grafana/dashboards](https://grafana.com/grafana/dashboards).
   - Recherchez "Kubernetes" ou "Prometheus" et téléchargez un fichier JSON.

2. **Importez-le dans Grafana :**
   - Allez dans **Create > Import**.
   - Importez le fichier JSON téléchargé.
   - Associez-le à la source de données Prometheus.

---

## 4. Utilisation

### 4.1 Accès à l'Application
1. **Obtenez l'URL exposée par Minikube :**
   ```bash
   minikube service gestion-formation-service --url
   ```

2. **Ouvrez l'URL dans un navigateur pour accéder à l'application.**

### 4.2 Surveillance avec Prometheus et Grafana

- **Prometheus** :
  - Accédez à l'interface Prometheus via `http://localhost:9090`.
  - Saisissez des requêtes PromQL pour explorer les métriques.

- **Grafana** :
  - Accédez aux dashboards à l’adresse `http://localhost:3000`.
  - Visualisez les performances des pods, nœuds et ressources cluster.

---

## 5. Résolution des Problèmes

### Problèmes Communes
1. **Pods en CrashLoopBackOff :**
   - Inspectez les logs du pod :
     ```bash
     kubectl logs <nom-du-pod>
     ```

2. **Problèmes de DNS :**
   - Assurez-vous que CoreDNS est fonctionnel :
     ```bash
     kubectl rollout restart deployment coredns -n kube-system
     ```

3. **Pas de données dans Grafana :**
   - Vérifiez la connectivité entre Grafana et Prometheus.
   - Testez l'URL Prometheus dans Grafana.

---

## 6. Conclusion
Ce guide couvre les étapes essentielles pour déployer et configurer l'application de gestion des formations avec des outils d’observabilité sur Kubernetes. Pour toute question supplémentaire, référez-vous à la documentation officielle de Kubernetes, Prometheus et Grafana.

