pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('b639cd9c-96e4-4a50-9170-b55af835281e') // Remplacez par votre ID de credentials Docker Hub
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
                    bat """
                    echo %DOCKER_HUB_CREDENTIALS_PSW% | docker login -u %DOCKER_HUB_CREDENTIALS_USR% --password-stdin
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
}
