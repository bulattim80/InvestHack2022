import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function Logout() {
    localStorage.clear();
    window.location.href = '/';
}