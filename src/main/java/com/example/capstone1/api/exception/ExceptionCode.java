
package com.example.capstone1.api.exception;
import lombok.Getter;

public enum ExceptionCode {
    POST_NOT_FOUND(404, "Post not found"),
    BOOKMARK_NOT_FOUND(404, "BookMark not found"),
    FOLLOW_NOT_FOUND(404, "Follow not found"),

    FOLLOW_ALREADY_EXISTS(404, "Follow Already Exists"),
    BOOKMARK_ALREADY_EXISTS(404, "BookMark Already Exists"),
    ENTER_ALREADY_EXISTS(404, "Enter Already Exists"),

    USERS_ALREADY_EXIST(404, "USERS Already Exists"),

    INVALID_JWT_TOKEN(404, "Invalid Jwt Token"),

    S3_DELETE_ERROR(404, "S3 Delete Error"),
    LOGO_NOT_FOUND(404, "Logo not found")
    ;

    @Getter
    private double status;

    @Getter
    private String message;

    ExceptionCode(double code, String message) {
        this.status = code;
        this.message = message;
    }
}
