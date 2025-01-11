pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('b639cd9c-96e4-4a50-9170-b55af835281e') // ID des credentials affichés dans votre capture
        DOCKER_IMAGE = 'molkabouzaida/gestion-formation:latest' // Nom de l'image Docker à créer
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/molkabou/gestion-formations.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    docker build -t $DOCKER_IMAGE .
                    '''
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    sh '''
                    echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin
                    '''
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh '''
                    docker push $DOCKER_IMAGE
                    '''
                }
            }
        }
    }
}
