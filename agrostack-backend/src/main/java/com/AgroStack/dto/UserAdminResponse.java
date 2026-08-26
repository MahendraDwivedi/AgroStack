package com.AgroStack.dto;

import com.AgroStack.model.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAdminResponse {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private boolean banned;
}
