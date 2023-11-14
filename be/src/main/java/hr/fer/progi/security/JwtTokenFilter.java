package hr.fer.progi.security;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/wildTrack/") || requestURI.startsWith("/wildTrack")){
            try {
                String token = jwtTokenProvider.resolveToken(request);
                if (token != null && jwtTokenProvider.validateToken(token)) {
                    // If the token is valid, set the authentication in the SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuthentication(token));
                }else{
                    throw new IOException();
                }
            } catch (Exception ex) {
                // Handle invalid token exception, e.g., log the error or send a specific response
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired token");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
