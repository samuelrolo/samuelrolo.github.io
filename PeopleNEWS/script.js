// Carregamento de dados
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados da newsletter
    fetch('newsletter_content.json')
        .then(response => response.json())
        .then(data => {
            loadNewsletterArticles(data.newsletter);
        })
        .catch(error => console.error('Erro ao carregar dados da newsletter:', error));

    // Carregar recomendações do LinkedIn
    fetch('linkedin_recommendations.json')
        .then(response => response.json())
        .then(data => {
            loadLinkedInRecommendations(data.linkedin_recommendations);
        })
        .catch(error => console.error('Erro ao carregar recomendações do LinkedIn:', error));

    // Carregar publicações do Instagram
    fetch('instagram_posts.json')
        .then(response => response.json())
        .then(data => {
            loadInstagramPosts(data.instagram_posts);
        })
        .catch(error => console.error('Erro ao carregar publicações do Instagram:', error));
});

// Funções para carregar conteúdo
function loadNewsletterArticles(newsletter) {
    const articlesContainer = document.getElementById('articlesContainer');
    let currentArticleIndex = 0;
    
    // Limpar o container
    articlesContainer.innerHTML = '';
    
    // Adicionar cada artigo
    newsletter.articles.forEach((article, index) => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.style.display = index === currentArticleIndex ? 'flex' : 'none';
        
        articleCard.innerHTML = `
            <img src="${article.image_path}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-date">${article.date}</p>
                <p class="article-summary">${article.summary}</p>
                <a href="${article.url}" class="article-link" target="_blank">Ler mais <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        articlesContainer.appendChild(articleCard);
    });
    
    // Configurar navegação do carrossel
    document.getElementById('prevArticle').addEventListener('click', () => {
        const articles = articlesContainer.querySelectorAll('.article-card');
        articles[currentArticleIndex].style.display = 'none';
        currentArticleIndex = (currentArticleIndex - 1 + articles.length) % articles.length;
        articles[currentArticleIndex].style.display = 'flex';
    });
    
    document.getElementById('nextArticle').addEventListener('click', () => {
        const articles = articlesContainer.querySelectorAll('.article-card');
        articles[currentArticleIndex].style.display = 'none';
        currentArticleIndex = (currentArticleIndex + 1) % articles.length;
        articles[currentArticleIndex].style.display = 'flex';
    });
}

function loadLinkedInRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    let currentRecommendationIndex = 0;
    
    // Limpar o container
    recommendationsContainer.innerHTML = '';
    
    // Adicionar cada recomendação
    recommendations.forEach((recommendation, index) => {
        const recommendationCard = document.createElement('div');
        recommendationCard.className = 'recommendation-card';
        recommendationCard.style.display = index === currentRecommendationIndex ? 'block' : 'none';
        
        // Gerar iniciais para avatar
        const nameParts = recommendation.name.split(' ');
        const initials = nameParts[0].charAt(0) + (nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '');
        
        recommendationCard.innerHTML = `
            <div class="recommender-info">
                <div class="recommender-avatar" style="background-color: #0A66C2; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">${initials}</div>
                <div>
                    <h4 class="recommender-name">${recommendation.name}</h4>
                    <p class="recommender-position">${recommendation.position}</p>
                </div>
            </div>
            <p class="recommendation-text">"${recommendation.text}"</p>
            <p class="recommendation-date">${recommendation.date}</p>
        `;
        
        recommendationsContainer.appendChild(recommendationCard);
    });
    
    // Configurar navegação do carrossel
    document.getElementById('prevRecommendation').addEventListener('click', () => {
        const recommendations = recommendationsContainer.querySelectorAll('.recommendation-card');
        recommendations[currentRecommendationIndex].style.display = 'none';
        currentRecommendationIndex = (currentRecommendationIndex - 1 + recommendations.length) % recommendations.length;
        recommendations[currentRecommendationIndex].style.display = 'block';
    });
    
    document.getElementById('nextRecommendation').addEventListener('click', () => {
        const recommendations = recommendationsContainer.querySelectorAll('.recommendation-card');
        recommendations[currentRecommendationIndex].style.display = 'none';
        currentRecommendationIndex = (currentRecommendationIndex + 1) % recommendations.length;
        recommendations[currentRecommendationIndex].style.display = 'block';
    });
}

function loadInstagramPosts(posts) {
    const instagramGrid = document.getElementById('instagramGrid');
    
    // Limpar o grid
    instagramGrid.innerHTML = '';
    
    // Adicionar cada publicação
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'instagram-post';
        
        // Limitar o tamanho do título
        let shortTitle = post.title;
        if (shortTitle.length > 40) {
            shortTitle = shortTitle.substring(0, 40) + '...';
        }
        
        postElement.innerHTML = `
            <div class="instagram-post-header">
                <i class="fab fa-instagram instagram-icon"></i>
                <h4 class="instagram-post-title">${shortTitle}</h4>
            </div>
            <div class="instagram-post-content">
                <p class="instagram-post-summary">${post.summary}</p>
                <p class="instagram-post-hashtags">${post.hashtags}</p>
            </div>
            <a href="${post.url}" class="instagram-post-link" target="_blank">Ver no Instagram</a>
        `;
        
        instagramGrid.appendChild(postElement);
    });
}
