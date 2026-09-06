package com.securebank.securebank.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {

    private String fullName;

    private String phone;

    private String address;

    private String city;

    private String pincode;

    private String profileImage;

}