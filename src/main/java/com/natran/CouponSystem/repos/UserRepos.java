package com.natran.CouponSystem.repos;

import com.natran.CouponSystem.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepos extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
}
