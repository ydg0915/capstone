
package com.example.capstone1.api.exception;
import lombok.Getter;

public enum ExceptionCode {
    POST_NOT_FOUND(404, "Post not found"),
    BOOKMARK_NOT_FOUND(404, "BookMark not found");

    @Getter
    private double status;

    @Getter
    private String message;

    ExceptionCode(double code, String message) {
        this.status = code;
        this.message = message;
    }
}
