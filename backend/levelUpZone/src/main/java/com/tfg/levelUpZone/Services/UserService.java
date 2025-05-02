package com.tfg.levelUpZone.Services;

import com.tfg.levelUpZone.entities.User;
import com.tfg.levelUpZone.repositories.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.Optional;

@NoArgsConstructor
@Service
public class UserService implements UserDetailsService {
	
    @Autowired
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
    	this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
        String roleName = "ROLE_" + user.getRole().getName().name(); // Agrega el "ROLE_" prefijo
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roleName);

        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                Collections.singleton(authority)
        );
    }
    
    public void deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    public boolean existsByUserName(String username){
        return userRepository.existsByUserName(username);
    }

    public void save(User user){
        userRepository.save(user);
    }
}