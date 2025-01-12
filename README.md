# DevOps Mini-Projet : Conteneurisation, Orchestration et Monitoring d'une Application Web
Introduction :

## 1. Introduction

Ce projet DevOps consiste à conteneuriser, orchestrer et surveiller une application web développée par l'étudiant. L'application sera déployée sur un cluster Kubernetes local (par exemple Minikube). Un système de monitoring avec Prometheus et Grafana sera mis en place pour collecter et visualiser les métriques.
Objectifs :

## 2. Objectifs

- **Conteneurisation** : Utiliser Docker pour empaqueter l'application.
- **Orchestration** : Déployer l'application sur Kubernetes.
- **Monitoring** : Intégrer Prometheus et Grafana pour observer l'application.
Structure du Projet :

## 3. Structure du Projet

### 3.1. Conteneurisation
- **App** : Conteneur principal exposé sur le port 5000.
- **MySQL** : Base de données, exposée sur le port 3306.

### 3.2. Orchestration Kubernetes
- Deployments et Services pour la gestion des pods.
- ConfigMap et Secrets pour les configurations sensibles.

### 3.3. Intégration Continue
- Pipeline Jenkins pour automatiser les tâches DevOps.
- Construction, scan de vulnérabilités, et push des images Docker.

### 3.4. Monitoring et Observabilité
- Prometheus pour collecter les métriques.
- Grafana pour visualiser les métriques avec des tableaux de bord.
Instructions de Déploiement :


## 4. Instructions de Déploiement

### 4.1. Prérequis
- Docker, Docker Compose, Kubernetes, Minikube, Helm.

### 4.2. Conteneurisation
```bash
docker build -t <votre-utilisateur-dockerhub>/gestion-formation:latest .
docker-compose up
4.3. Déploiement Kubernetes


minikube start
kubectl apply -f k8s/
helm install gestion-formation ./helm-chart
4.4. Monitoring avec Prometheus et Grafana

helm install prometheus prometheus-community/prometheus --namespace monitoring
helm install grafana prometheus-community/grafana --namespace monitoring

