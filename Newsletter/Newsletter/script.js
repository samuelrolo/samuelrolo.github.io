// Carregamento de dados e manipulação dos carrosséis
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados dos artigos da newsletter
    fetch('newsletter_content.json')
        .then(response => response.json())
        .then(data => {
            loadArticles(data.articles);
            setupArticleCarousel();
        })
        .catch(error => console.error('Erro ao carregar artigos:', error));

    // Carregar recomendações do LinkedIn
    fetch('linkedin_recommendations.json')
        .then(response => response.json())
        .then(data => {
            loadRecommendations(data.recommendations);
            setupRecommendationCarousel();
        })
        .catch(error => console.error('Erro ao carregar recomendações:', error));

    // Carregar posts do Instagram
    fetch('instagram_posts.json')
        .then(response => response.json())
        .then(data => {
            loadInstagramPosts(data.posts);
        })
        .catch(error => console.error('Erro ao carregar posts do Instagram:', error));
});

// Funções para carregar conteúdo
function loadArticles(articles) {
    const container = document.getElementById('articlesContainer');
    
    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        
        articleCard.innerHTML = `
            <h3>${article.title}</h3>
            <p class="article-date">${article.date}</p>
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <p>${article.summary}</p>
            </div>
            <a href="${article.link}" class="read-more" target="_blank">Ler mais</a>
        `;
        
        container.appendChild(articleCard);
    });
}

function loadRecommendations(recommendations) {
    const container = document.getElementById('recommendationsContainer');
    
    recommendations.forEach(recommendation => {
        const recommendationCard = document.createElement('div');
        recommendationCard.className = 'recommendation-card';
        
        recommendationCard.innerHTML = `
            <div class="recommender-info">
                <img src="${recommendation.avatar}" alt="${recommendation.name}" class="recommender-avatar">
                <div>
                    <h4 class="recommender-name">${recommendation.name}</h4>
                    <p class="recommender-title">${recommendation.title}</p>
                </div>
            </div>
            <p class="recommendation-text">"${recommendation.text}"</p>
        `;
        
        container.appendChild(recommendationCard);
    });
}

function loadInstagramPosts(posts) {
    const grid = document.getElementById('instagramGrid');
    
    posts.forEach(post => {
        const postElement = document.createElement('a');
        postElement.className = 'instagram-post';
        postElement.href = post.link;
        postElement.target = '_blank';
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="Post do Instagram">
            <div class="post-overlay">
                <p class="post-caption">${post.caption}</p>
            </div>
        `;
        
        grid.appendChild(postElement);
    });
}

// Funções para controlar os carrosséis
function setupArticleCarousel() {
    const container = document.getElementById('articlesContainer');
    const articles = container.querySelectorAll('.article-card');
    let currentArticle = 0;
    
    // Esconder todos os artigos exceto o primeiro
    articles.forEach((article, index) => {
        if (index !== 0) {
            article.style.display = 'none';
        }
    });
    
    // Configurar botões de navegação
    document.getElementById('prevArticle').addEventListener('click', () => {
        articles[currentArticle].style.display = 'none';
        currentArticle = (currentArticle - 1 + articles.length) % articles.length;
        articles[currentArticle].style.display = 'block';
    });
    
    document.getElementById('nextArticle').addEventListener('click', () => {
        articles[currentArticle].style.display = 'none';
        currentArticle = (currentArticle + 1) % articles.length;
        articles[currentArticle].style.display = 'block';
    });
}

function setupRecommendationCarousel() {
    const container = document.getElementById('recommendationsContainer');
    const recommendations = container.querySelectorAll('.recommendation-card');
    let currentRecommendation = 0;
    
    // Esconder todas as recomendações exceto a primeira
    recommendations.forEach((recommendation, index) => {
        if (index !== 0) {
            recommendation.style.display = 'none';
        }
    });
    
    // Configurar botões de navegação
    document.getElementById('prevRecommendation').addEventListener('click', () => {
        recommendations[currentRecommendation].style.display = 'none';
        currentRecommendation = (currentRecommendation - 1 + recommendations.length) % recommendations.length;
        recommendations[currentRecommendation].style.display = 'block';
    });
    
    document.getElementById('nextRecommendation').addEventListener('click', () => {
        recommendations[currentRecommendation].style.display = 'none';
        currentRecommendation = (currentRecommendation + 1) % recommendations.length;
        recommendations[currentRecommendation].style.display = 'block';
    });
}
