package com.eservice1.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;

import java.io.IOException;

import com.eservice1.user.entity.User;
import com.eservice1.user.repository.UserRepository;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public JwtFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(

            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("FILTER HIT");

        System.out.println(
                "REQUEST URI = " +
                        request.getRequestURI()
        );
        System.out.println(
                "AUTH BEFORE  = " +
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
        );
        String header =
                request.getHeader("Authorization");

        if (header != null
                && header.startsWith("Bearer ")) {

            String token =
                    header.substring(7);

            if (jwtService.isValid(token)) {
                System.out.println("JWT VALID");
                String phoneNumber =
                        jwtService.extractPhoneNumber(token);

                User user =
                        userRepository.findByPhoneNumber(
                                phoneNumber
                        ).orElseThrow();

                System.out.println("ROLE = " + user.getRole());

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                phoneNumber,
                                null,
                                java.util.List.of(
                                        user.getAuthority()
                                )
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(auth);
            }
        }
        System.out.println(
                "AUTH AFTER = " +
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
        );
        filterChain.doFilter(
                request,
                response
        );
    }
}
