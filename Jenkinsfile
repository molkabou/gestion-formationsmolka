pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "molkabouzaida/gestion-formation:latest" // Remplacez par le nom de votre image
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/molkabou/gestion-formationsmolka.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t ${DOCKER_IMAGE_NAME} .
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-credentials-id', variable: 'DOCKER_HUB_TOKEN')]) {
                        sh """
                        echo "$DOCKER_HUB_TOKEN" | docker login -u "molkabouzaida" --password-stdin
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                    docker push ${DOCKER_IMAGE_NAME}
                    """
                }
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
