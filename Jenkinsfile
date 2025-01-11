pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'molkabouzaida/gestion-formation:latest'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-credentials-id', variable: 'DOCKER_HUB_PASSWORD')]) {
                        sh """
                        echo "$DOCKER_HUB_PASSWORD" | docker login -u "molkabouzaida" --password-stdin
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}
