pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'molkabouzaida/gestion-formation:latest'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/molkabou/gestion-formationsmolka.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    // Utilisation de l'utilisateur et mot de passe directement
                    bat """
                    echo Molka123* | docker login -u molkabouzaida --password-stdin
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                bat 'docker push %DOCKER_IMAGE%'
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}
